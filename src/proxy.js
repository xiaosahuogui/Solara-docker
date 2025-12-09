const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_BASE_URL = "https://music-api.gdstudio.xyz/api.php";
const KUWO_HOST_PATTERN = /(^|\.)kuwo\.cn$/i;
const SAFE_RESPONSE_HEADERS = ["content-type", "cache-control", "accept-ranges", "content-length", "content-range", "etag", "last-modified", "expires"];

// 增加重试配置
const FETCH_CONFIG = {
  timeout: 15000, // 15秒超时
  retryCount: 2,  // 重试2次
  retryDelay: 1000 // 重试间隔1秒
};

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

// 带重试的 fetch 函数
async function fetchWithRetry(url, options, retries = FETCH_CONFIG.retryCount) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_CONFIG.timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (i === retries) throw error;
      console.log(`请求失败，${FETCH_CONFIG.retryDelay}ms后重试 (${i + 1}/${retries})...`);
      await new Promise(resolve => setTimeout(resolve, FETCH_CONFIG.retryDelay));
    }
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
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
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
    console.error('Proxy error:', error.message);
    res.set(createCorsHeaders());
    res.status(500).send('Proxy error: ' + error.message);
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

  // 记录请求信息用于调试
  console.log('API Request:', {
    url: apiUrl.toString(),
    params: Object.fromEntries(apiUrl.searchParams)
  });

  try {
    const upstream = await fetchWithRetry(apiUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      },
    });

    const headers = createCorsHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    // 添加一些缓存头，减少重复请求
    headers['Cache-Control'] = 'public, max-age=300'; // 5分钟缓存

    res.set(headers);
    res.status(upstream.status);
    
    const data = await upstream.text();
    res.send(data);
  } catch (error) {
    console.error('API proxy error:', error.message);
    console.error('Error details:', {
      code: error.code,
      errno: error.errno,
      type: error.type
    });
    
    res.set(createCorsHeaders());
    res.status(502).json({
      error: '网关错误',
      message: '无法连接到音乐API服务器',
      details: error.message
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
