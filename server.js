// 添加全局错误捕获
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

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

// 智能检测是否应该使用 secure cookie
const shouldUseSecureCookie = (req) => {
  // 如果明确设置了 FORCE_HTTPS 环境变量，强制使用 secure
  if (process.env.FORCE_HTTPS === 'true') {
    return true;
  }
  
  // 如果明确设置了 DISABLE_SECURE_COOKIE 环境变量，强制禁用 secure
  if (process.env.DISABLE_SECURE_COOKIE === 'true') {
    return false;
  }
  
  // 自动检测：如果请求是通过 HTTPS 或者设置了 X-Forwarded-Proto 头为 https
  const protocol = req.get('X-Forwarded-Proto') || req.protocol;
  const isHttps = protocol === 'https';
  
  console.log(`请求协议检测: ${protocol}, 原始协议: ${req.protocol}, 是否HTTPS: ${isHttps}`);
  
  return isHttps;
};

// 动态 session 中间件
app.use((req, res, next) => {
  const useSecureCookie = shouldUseSecureCookie(req);
  
  // 为当前请求动态创建 session 中间件
  cookieSession({
    name: 'solara.sid',
    keys: sessionKeys,
    maxAge: 24 * 60 * 60 * 1000, // 24小时
    secure: useSecureCookie, // 根据请求动态设置
    httpOnly: true,
    sameSite: 'lax'
  })(req, res, next);
  
  // 记录 session 配置信息（仅记录一次，避免重复日志）
  if (!req.session._configLogged) {
    console.log(`Session 配置 - 协议: ${req.protocol}, 安全Cookie: ${useSecureCookie}, 用户IP: ${req.ip}`);
    req.session._configLogged = true;
  }
});

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
  // 允许 OPTIONS 预检请求通过
  if (req.method === 'OPTIONS') {
    return next();
  }

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
      userAgent: req.get('User-Agent'),
      loginProtocol: req.get('X-Forwarded-Proto') || req.protocol,
      secureCookie: shouldUseSecureCookie(req)
    };

    console.log(`登录成功 - 用户: ${req.session.user.loginTime}, 协议: ${req.session.user.loginProtocol}, 安全Cookie: ${req.session.user.secureCookie}`);
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
    serverTimeLocal: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    currentProtocol: req.get('X-Forwarded-Proto') || req.protocol,
    secureCookie: shouldUseSecureCookie(req)
  };
  res.json(status);
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  const protocol = req.get('X-Forwarded-Proto') || req.protocol;
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    protocol: protocol,
    secureCookie: shouldUseSecureCookie(req),
    headers: {
      'x-forwarded-proto': req.get('X-Forwarded-Proto'),
      'x-forwarded-for': req.get('X-Forwarded-For'),
      'user-agent': req.get('User-Agent')
    }
  });
});

// 调试端点：显示当前请求的详细信息
app.get('/api/debug', (req, res) => {
  const debugInfo = {
    headers: {
      'x-forwarded-proto': req.get('X-Forwarded-Proto'),
      'x-forwarded-for': req.get('X-Forwarded-For'),
      'host': req.get('Host'),
      'user-agent': req.get('User-Agent')
    },
    connection: {
      protocol: req.protocol,
      secure: req.secure,
      ip: req.ip,
      ips: req.ips
    },
    session: {
      authenticated: !!req.session.authenticated,
      secureCookie: shouldUseSecureCookie(req),
      config: {
        FORCE_HTTPS: process.env.FORCE_HTTPS,
        DISABLE_SECURE_COOKIE: process.env.DISABLE_SECURE_COOKIE,
        NODE_ENV: process.env.NODE_ENV
      }
    }
  };
  res.json(debugInfo);
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

// 404 处理 - 修复：使用 HTML 响应而不是不存在的文件
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API端点不存在' });
  } else {
    // 返回简单的 HTML 404 页面，而不是尝试读取不存在的文件
    res.status(404).send(`
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>页面未找到 - Solara Music</title>
          <style>
              body { 
                  font-family: Arial, sans-serif; 
                  text-align: center; 
                  padding: 50px; 
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
              }
              .container {
                  background: rgba(255,255,255,0.1);
                  padding: 40px;
                  border-radius: 10px;
                  backdrop-filter: blur(10px);
              }
              h1 { font-size: 48px; margin-bottom: 20px; }
              p { font-size: 18px; margin-bottom: 30px; }
              a { 
                  color: white; 
                  text-decoration: none;
                  border: 1px solid white;
                  padding: 10px 20px;
                  border-radius: 5px;
                  transition: all 0.3s;
              }
              a:hover {
                  background: white;
                  color: #667eea;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>404</h1>
              <p>抱歉，您访问的页面不存在。</p>
              <a href="/">返回首页</a>
          </div>
      </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`Solara Music Server 启动成功`);
  console.log(`=================================================`);
  console.log(`服务端口: ${PORT}`);
  console.log(`默认密码: ${AUTH_PASSWORD}`);
  console.log(`Session Keys: ${sessionKeys.length} keys configured`);
  console.log(`环境变量配置:`);
  console.log(`  - NODE_ENV: ${process.env.NODE_ENV || '未设置'}`);
  console.log(`  - FORCE_HTTPS: ${process.env.FORCE_HTTPS || '未设置'}`);
  console.log(`  - DISABLE_SECURE_COOKIE: ${process.env.DISABLE_SECURE_COOKIE || '未设置'}`);
  console.log(`Cookie 安全模式: 智能检测`);
  console.log(`=================================================`);
  console.log(`访问地址:`);
  console.log(`  - 直接访问: http://localhost:${PORT}`);
  console.log(`  - 健康检查: http://localhost:${PORT}/api/health`);
  console.log(`  - 调试信息: http://localhost:${PORT}/api/debug`);
  console.log(`  - 登录页面: http://localhost:${PORT}/login.html`);
  console.log(`=================================================`);
  console.log(`使用说明:`);
  console.log(`  - HTTP 环境: 自动使用普通 Cookie`);
  console.log(`  - HTTPS 环境: 自动使用安全 Cookie`);
  console.log(`  - 强制 HTTPS: 设置 FORCE_HTTPS=true`);
  console.log(`  - 强制 HTTP: 设置 DISABLE_SECURE_COOKIE=true`);
  console.log(`=================================================`);
});
