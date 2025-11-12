const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 3001;

// 配置密码（在实际环境中应该使用环境变量）
const AUTH_PASSWORD = process.env.SOLARA_PASSWORD || 'solara123';

// 信任代理（如果部署在反向代理后面）
app.set('trust proxy', 1);

// Cookie Session配置 - 替换 express-session
const sessionKeys = process.env.SESSION_KEYS 
  ? process.env.SESSION_KEYS.split(',') 
  : ['solara-music-secret-key-1', 'solara-music-secret-key-2'];

app.use(cookieSession({
  name: 'solara.sid',
  keys: sessionKeys,
  maxAge: 24 * 60 * 60 * 1000, // 24小时
  secure: process.env.NODE_ENV === 'production', // 生产环境使用HTTPS
  httpOnly: true,
  sameSite: 'lax'
}));

// CORS 配置
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
  req.session = null; // 清除 cookie session
  res.json({ success: true, message: '已退出登录' });
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

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
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

// 404 处理
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API端点不存在' });
  } else {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Solara Music Server running on port ${PORT}`);
  console.log(`默认密码: ${AUTH_PASSWORD}`);
  console.log(`Session Keys: ${sessionKeys.length} keys configured`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
  console.log(`登录页面: http://localhost:${PORT}/login.html`);
  console.log(`主页面: http://localhost:${PORT}/`);
});