const express = require('express');
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

router.get('/', async (req, res) => {
  try {
    const imageParam = req.query.image || req.query.url;
    
    if (!imageParam) {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      });
      return res.status(400).json({ error: 'Missing image parameter' });
    }

    let target;
    try {
      target = new URL(imageParam);
    } catch {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      });
      return res.status(400).json({ error: 'Invalid image URL' });
    }

    // 模拟获取图片数据
    try {
      const upstreamResponse = await fetch(target.toString());
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

      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      });
      
      return res.json(palette);
    } catch (error) {
      console.error('Image processing error:', error);
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      });
      return res.status(500).json({ error: 'Failed to process image' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8'
    });
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.options('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(204).send();
});

module.exports = router;