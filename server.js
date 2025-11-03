const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 配置
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
  exposedHeaders: ['Content-Range', 'Content-Length']
}));

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 导入路由
const paletteRouter = require('./src/palette');
const proxyRouter = require('./src/proxy');

// 使用路由
app.use('/palette', paletteRouter);
app.use('/proxy', proxyRouter);

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Solara Music Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 处理前端路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Solara Music Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});