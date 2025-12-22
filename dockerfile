# ==========================================
# Multi-arch Dockerfile for Solara Music
# Supports: AMD64, ARM64, ARMv7
# ==========================================

# --- Stage 1: Builder (构建阶段) ---
# 使用官方 Node.js 18 Alpine 镜像作为基础
FROM node:18-alpine AS builder

WORKDIR /app

# 安装构建依赖 (关键步骤)
# python3, make, g++ 是编译原生 Node.js 模块所必需的
# 这解决了 ARM64 架构下缺少预编译二进制文件导致 npm install 失败的问题
RUN apk add --no-cache libc6-compat python3 make g++

# 优先复制 package.json 利用 Docker 缓存机制加速构建
COPY package*.json ./

# 安装生产环境依赖
# 如果有原生模块，将会利用上面的工具进行编译
RUN npm install --production

# --- Stage 2: Runner (运行阶段) ---
# 这是一个全新的镜像层，只包含运行时需要的文件
FROM node:18-alpine AS runner

WORKDIR /app

# 安装运行时基础库
# tini 是一个微型 init 系统，用于正确处理信号和僵尸进程
RUN apk add --no-cache libc6-compat tini

# 创建非 root 用户 (为了安全)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3001

# 从构建阶段复制已安装好的 node_modules
COPY --from=builder /app/node_modules ./node_modules

# 复制应用程序源代码
COPY . .

# 修改文件权限给非 root 用户
RUN chown -R appuser:nodejs /app

# 切换到非 root 用户
USER appuser

# 暴露端口
EXPOSE 3001

# 使用 tini 作为入口点
ENTRYPOINT ["/sbin/tini", "--"]

# 启动应用
CMD ["npm", "start"]
