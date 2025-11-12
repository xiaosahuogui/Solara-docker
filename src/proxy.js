const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const GD_MUSIC_API = "https://music-api.gdstudio.xyz/api.php";
const KUWO_HOST_PATTERN = /(^|\.)kuwo\.cn$/i;
const SAFE_RESPONSE_HEADERS = ["content-type", "cache-control", "accept-ranges", "content-length", "content-range", "etag", "last-modified", "expires"];

// 音质映射 - 适配GD音乐台API (根据文档只有128/192/320/740/999)
const QUALITY_MAP = {
    "128": "128",
    "192": "192", 
    "320": "320",
    "flac": "999",  // flac映射到999无损
    // 移除flac24bit，因为GD音乐台不支持24bit
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
        const upstream = await fetch(normalized.toString(), init);
        
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
        console.error('Proxy error:', error);
        res.set(createCorsHeaders());
        res.status(500).send('Proxy error');
    }
}

// 处理 GD 音乐台请求
async function handleGDMusicRequest(params, res) {
    const apiUrl = new URL(GD_MUSIC_API);
    
    Object.keys(params).forEach(key => {
        if (key !== 'target' && key !== 'callback' && key !== 'quality' && key !== 's') {
            apiUrl.searchParams.set(key, params[key]);
        }
    });

    // 特殊处理：将quality参数映射为br参数
    if (params.quality && params.types === 'url') {
        const mappedQuality = QUALITY_MAP[params.quality] || '320';
        apiUrl.searchParams.set('br', mappedQuality);
    }

    // 添加随机参数避免缓存
    apiUrl.searchParams.set('_t', Date.now());

    if (!apiUrl.searchParams.has('types')) {
        throw new Error('Missing types');
    }

    try {
        const response = await fetch(apiUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
                'Referer': 'https://music.gdstudio.xyz/'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.text();
        return JSON.parse(data);
        
    } catch (error) {
        console.error('GD music request failed:', error);
        throw error;
    }
}

// 处理 API 请求 - 全部使用 GD 音乐台
async function proxyApiRequest(req, res) {
    const params = req.query;
    
    if (!params.types) {
        res.set(createCorsHeaders());
        return res.status(400).send('Missing types');
    }

    try {
        const result = await handleGDMusicRequest(params, res);

        const headers = createCorsHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });

        res.set(headers);
        res.status(200).json(result);
        
    } catch (error) {
        console.error('API proxy error:', error);
        res.set(createCorsHeaders());
        res.status(500).json({ 
            error: 'API proxy error',
            message: error.message 
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