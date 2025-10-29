const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_BASE_URL = "https://music-api.gdstudio.xyz/api.php";
const KUWO_HOST_PATTERN = /(^|\.)kuwo\.cn$/i;
const SAFE_RESPONSE_HEADERS = ["content-type", "cache-control", "accept-ranges", "content-length", "content-range", "etag", "last-modified", "expires"];

// 请求配置
const REQUEST_CONFIG = {
  timeout: 30000, // 30秒超时
  retries: 3,     // 重试3次
  retryDelay: 1000 // 重试延迟1秒
};

// 带重试的 fetch 函数
async function fetchWithRetry(url, options = {}, retries = REQUEST_CONFIG.retries, delay = REQUEST_CONFIG.retryDelay) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_CONFIG.timeout);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (retries > 0 && (error.name === 'AbortError' || error.code === 'ECONNRESET')) {
      console.log(`请求失败，${delay}ms后重试... (剩余重试次数: ${retries})`, error.message);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2); // 指数退避
    }
    throw error;
  }
}

// CORS 头函数
const createCorsHeaders = (init = {}) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    ...init
  };
  return headers;
};

// 处理 OPTIONS 请求
router.options('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(204).send();
});

function isAllowedKuwoHost(hostname) {
  if (!hostname) return false;
  return KUWO_HOST_PATTERN.test(hostname);
}

function normalizeKuwoUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (!isAllowedKuwoHost(parsed.hostname)) {
      return null;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    parsed.protocol = 'http:';
    return parsed;
  } catch {
    return null;
  }
}

async function proxyKuwoAudio(targetUrl, req, res) {
  const normalized = normalizeKuwoUrl(targetUrl);
  if (!normalized) {
    res.set(createCorsHeaders());
    return res.status(400).send('Invalid target');
  }

  const init = {
    method: req.method,
    headers: {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://www.kuwo.cn/',
    },
  };

  const rangeHeader = req.headers['range'];
  if (rangeHeader) {
    init.headers['Range'] = rangeHeader;
  }

  try {
    const upstream = await fetchWithRetry(normalized.toString(), init);
    
    const headers = createCorsHeaders();
    SAFE_RESPONSE_HEADERS.forEach(header => {
      const value = upstream.headers.get(header);
      if (value) headers[header] = value;
    });
    
    if (!headers['Cache-Control']) {
      headers['Cache-Control'] = 'public, max-age=3600';
    }

    res.set(headers);
    res.status(upstream.status);
    
    // 将响应流直接传输给客户端
    upstream.body.pipe(res);
  } catch (error) {
    console.error('音频代理错误:', error.message);
    res.set(createCorsHeaders());
    res.status(500).json({ 
      error: '代理错误',
      message: error.message,
      code: error.code
    });
  }
}

async function proxyApiRequest(req, res) {
  const apiUrl = new URL(API_BASE_URL);
  
  Object.keys(req.query).forEach(key => {
    if (key !== 'target' && key !== 'callback') {
      apiUrl.searchParams.set(key, req.query[key]);
    }
  });

  if (!apiUrl.searchParams.has('types')) {
    res.set(createCorsHeaders());
    return res.status(400).send('Missing types');
  }

  try {
    const upstream = await fetchWithRetry(apiUrl.toString(), {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });

    const headers = createCorsHeaders();
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    res.set(headers);
    res.status(upstream.status);
    
    const data = await upstream.text();
    res.send(data);
  } catch (error) {
    console.error('API 代理错误:', error.message);
    res.set(createCorsHeaders());
    res.status(500).json({ 
      error: 'API 代理错误',
      message: error.message,
      code: error.code,
      url: apiUrl.toString()
    });
  }
}

router.get('/', async (req, res) => {
  const target = req.query.target;

  if (target) {
    return proxyKuwoAudio(target, req, res);
  }

  return proxyApiRequest(req, res);
});

module.exports = router;
