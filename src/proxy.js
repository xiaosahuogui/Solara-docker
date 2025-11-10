const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const FISH_MUSIC_API = process.env.FISH_MUSIC_API || "https://m-api.ceseet.me";
const FISH_MUSIC_KEY = process.env.FISH_MUSIC_KEY || "";
const GD_MUSIC_API = "https://music-api.gdstudio.xyz/api.php";
const KUWO_HOST_PATTERN = /(^|\.)kuwo\.cn$/i;
const SAFE_RESPONSE_HEADERS = ["content-type", "cache-control", "accept-ranges", "content-length", "content-range", "etag", "last-modified", "expires"];

// 音源映射
const SOURCE_MAP = {
    'netease': 'wy',
    'kuwo': 'kw', 
    'qq': 'tx',
};

// 音质映射
const QUALITY_MAP = {
    // 标准映射
    "128": "128k",
    "320": "320k",
    "flac": "flac",
    "flac24bit": "flac24bit",
    
    // 兼容性映射
    "192": "320k",     // 将不支持的192k提升到320k
    "999": "flac"      // 历史格式映射
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

// 处理 fish-music 请求
async function handleFishMusicRequest(params, res) {
    const { types, source, id, quality, name, count = 50, pages = 1 } = params;
    
    // 映射源名称
    const fishSource = SOURCE_MAP[source] || source;
    if (!fishSource) {
        throw new Error(`Unsupported source: ${source}`);
    }
    
    try {
        let url;
        const headers = {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/json',
            'X-Request-Key': FISH_MUSIC_KEY
        };

        switch (types) {
            case 'url':
                // 映射音质
                const fishQuality = QUALITY_MAP[quality] || '320k';
                url = `${FISH_MUSIC_API}/url/${fishSource}/${id}/${fishQuality}`;
                break;
                
            case 'lyric':
                url = `${FISH_MUSIC_API}/lyric/${fishSource}/${id}`;
                break;
                
            case 'pic':
                url = `${FISH_MUSIC_API}/pic/${fishSource}/${id}`;
                break;
                
            case 'search':
                // fish-music 可能不支持搜索，回退到 GD 音乐台
                throw new Error('Search not supported by fish-music, fallback to GD music');
                
            default:
                throw new Error(`Unsupported type: ${types}`);
        }

        console.log(`Fish-music request: ${url}`);
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        // 处理 fish-music 响应格式
        if (data.code !== 0) {
            throw new Error(data.msg || `Fish-music error: ${data.code}`);
        }
        
        // 根据类型返回不同格式的数据
        switch (types) {
            case 'url':
                return { url: data.data };
            case 'lyric':
                return { 
                    lyric: data.data?.lyric || data.data,
                    tlyric: data.data?.tlyric || "",
                    rlyric: data.data?.rlyric || ""
                };
            case 'pic':
                return { url: data.data };
            default:
                return data.data;
        }
        
    } catch (error) {
        console.error('Fish-music request failed:', error);
        throw error;
    }
}

// 处理 GD 音乐台请求（用于搜索等 fish-music 不支持的功能）
async function handleGDMusicRequest(params, res) {
    const apiUrl = new URL(GD_MUSIC_API);
    
    Object.keys(params).forEach(key => {
        if (key !== 'target' && key !== 'callback') {
            apiUrl.searchParams.set(key, params[key]);
        }
    });

    if (!apiUrl.searchParams.has('types')) {
        throw new Error('Missing types');
    }

    try {
        const response = await fetch(apiUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
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

async function proxyApiRequest(req, res) {
    const params = req.query;
    
    if (!params.types) {
        res.set(createCorsHeaders());
        return res.status(400).send('Missing types');
    }

    try {
        let result;
        
        // 根据请求类型决定使用哪个 API
        switch (params.types) {
            case 'search':
                // 搜索使用 GD 音乐台（fish-music 不支持搜索）
                result = await handleGDMusicRequest(params, res);
                break;
                
            case 'url':
            case 'lyric':
            case 'pic':
                // 尝试使用 fish-music，失败时回退到 GD 音乐台
                try {
                    result = await handleFishMusicRequest(params, res);
                } catch (fishError) {
                    console.log('Fish-music failed, fallback to GD music:', fishError.message);
                    result = await handleGDMusicRequest(params, res);
                }
                break;
                
            default:
                // 其他请求使用 GD 音乐台
                result = await handleGDMusicRequest(params, res);
        }

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