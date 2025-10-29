const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 导入路由
const paletteRouter = require('./src/palette');
const proxyRouter = require('./src/proxy');

// 使用路由
app.use('/palette', paletteRouter);
app.use('/proxy', proxyRouter);

// 详细的健康检查端点
app.get('/api/health', async (req, res) => {
  const healthcheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0'
  };

  try {
    // 测试外部 API 连接
    const testResponse = await fetch('https://music-api.gdstudio.xyz/api.php?types=search&source=kuwo&name=test&count=1', {
      timeout: 10000
    });
    healthcheck.externalApi = testResponse.ok ? 'accessible' : 'unreachable';
  } catch (error) {
    healthcheck.externalApi = 'error: ' + error.message;
  }

  res.json(healthcheck);
});

// 处理前端路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 全局错误处理
app.use((error, req, res, next) => {
  console.error('全局错误:', error);
  res.status(500).json({
    error: '内部服务器错误',
    message: process.env.NODE_ENV === 'production' ? '请稍后重试' : error.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Solara Music Server running on port ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
});
