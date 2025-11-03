const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// 简化的调色板功能，不依赖 palette-core
function buildPalette(buffer, contentType) {
  // 返回模拟的调色板数据
  return Promise.resolve({
    source: '',
    baseColor: '#4a5568',
    averageColor: '#718096',
    accentColor: '#4299e1',
    contrastColor: '#1a202c',
    gradients: {
      light: {
        gradient: 'linear-gradient(140deg, #a0aec0 0%, #cbd5e0 45%, #edf2f7 100%)',
        colors: ['#a0aec0', '#cbd5e0', '#edf2f7']
      },
      dark: {
        gradient: 'linear-gradient(135deg, #2d3748 0%, #4a5568 55%, #718096 100%)',
        colors: ['#2d3748', '#4a5568', '#718096']
      }
    },
    tokens: {
      light: {
        primaryColor: '#4299e1',
        primaryColorDark: '#3182ce'
      },
      dark: {
        primaryColor: '#63b3ed',
        primaryColorDark: '#4299e1'
      }
    }
  });
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

const createJsonHeaders = (status) => {
  return createCorsHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': status === 200 ? 'public, max-age=3600' : 'no-store'
  });
};

// 处理 OPTIONS 请求
router.options('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(204).send();
});

router.get('/', async (req, res) => {
  try {
    const imageParam = req.query.image || req.query.url;
    
    if (!imageParam) {
      res.set(createJsonHeaders(400));
      return res.json({ error: 'Missing image parameter' });
    }

    let target;
    try {
      target = new URL(imageParam);
    } catch {
      res.set(createJsonHeaders(400));
      return res.json({ error: 'Invalid image URL' });
    }

    // 模拟获取图片数据
    try {
      const upstreamResponse = await fetch(target.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!upstreamResponse.ok) {
        throw new Error(`HTTP ${upstreamResponse.status}`);
      }
      
      const contentType = upstreamResponse.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) {
        throw new Error('Unsupported content type');
      }

      // 使用模拟的调色板数据
      const palette = await buildPalette(null, contentType);
      palette.source = target.toString();

      res.set(createJsonHeaders(200));
      return res.json(palette);
      
    } catch (error) {
      console.error('Image processing error:', error);
      res.set(createJsonHeaders(500));
      return res.json({ error: 'Failed to process image' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.set(createJsonHeaders(500));
    return res.json({ error: 'Internal server error' });
  }
});

module.exports = router;