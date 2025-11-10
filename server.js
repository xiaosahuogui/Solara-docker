const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
// 在 server.js 中添加
const FISH_MUSIC_API = process.env.FISH_MUSIC_API || "https://m-api.ceseet.me";
const FISH_MUSIC_KEY = process.env.FISH_MUSIC_KEY || "";

// 配置密码（在实际环境中应该使用环境变量）
const AUTH_PASSWORD = process.env.SOLARA_PASSWORD || 'solara123';

// 信任代理（如果部署在反向代理后面）
app.set('trust proxy', 1);

// Session配置 - 修复版本
app.use(session({
  secret: process.env.SESSION_SECRET || 'solara-music-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // 开发环境设为false，生产环境根据HTTPS设置
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24小时
    sameSite: 'lax'
  },
  name: 'solara.sid' // 明确的session名称
}));

// CORS 配置 - 修复版本
app.use(cors({
  origin: true, // 允许当前origin
  credentials: true, // 允许携带凭证
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
  exposedHeaders: ['Content-Range', 'Content-Length']
}));

// 中间件
app.use(express.json());

// 身份验证中间件
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    // 对于 API 请求返回 JSON 错误
    if (req.path.startsWith('/api/') && !req.path.startsWith('/api/login') && !req.path.startsWith('/api/auth-status') && !req.path.startsWith('/api/health')) {
      res.status(401).json({ error: '需要身份验证' });
    } else {
      // 对于页面请求重定向到登录页
      res.redirect('/login.html');
    }
  }
};

// 静态文件服务 - 公开访问（登录页面相关资源）
app.use(express.static(path.join(__dirname, 'public')));

// 公开路由（不需要认证）
app.post('/api/login', express.json(), (req, res) => {
  const { password } = req.body;
  
  if (password === AUTH_PASSWORD) {
    req.session.authenticated = true;
    req.session.user = { 
      loginTime: new Date().toISOString(),
      userAgent: req.get('User-Agent')
    };
    
    console.log('登录成功，用户:', req.session.user);
    res.json({ 
      success: true, 
      message: '登录成功',
      user: req.session.user
    });
  } else {
    console.log('登录失败：密码错误');
    res.status(401).json({ 
      success: false, 
      error: '密码错误' 
    });
  }
});

app.post('/api/logout', (req, res) => {
  console.log('用户退出登录');
  req.session.destroy((err) => {
    if (err) {
      console.error('退出登录错误:', err);
      return res.status(500).json({ error: '退出登录失败' });
    }
    res.json({ success: true, message: '已退出登录' });
  });
});

app.get('/api/auth-status', (req, res) => {
  const status = {
    authenticated: !!req.session.authenticated,
    user: req.session.user || null,
    serverTime: new Date().toISOString(),
    serverTimeLocal: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  };
  res.json(status);
});

// 健康检查端点（公开）
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Solara Music Server is running',
    timestamp: new Date().toISOString(),
    timestampLocal: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    version: '1.0.0',
    authenticated: !!req.session.authenticated
  });
});

// 导入路由
const paletteRouter = require('./src/palette');
const proxyRouter = require('./src/proxy');

// 保护需要认证的路由
app.use('/palette', requireAuth, paletteRouter);
app.use('/proxy', requireAuth, proxyRouter);

// 主页面路由 - 需要认证
app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 登录页面路由 - 如果已认证则重定向到主页
app.get('/login.html', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 保护其他页面路由
app.get('/index.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Solara Music Server running on port ${PORT}`);
  console.log(`默认密码: ${AUTH_PASSWORD}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
  console.log(`登录页面: http://localhost:${PORT}/login.html`);
  console.log(`主页面: http://localhost:${PORT}/`);
});