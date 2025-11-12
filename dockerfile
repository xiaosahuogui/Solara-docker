FROM node:18-alpine

WORKDIR /app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install --production

# 复制应用文件
COPY . .

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# 更改文件所有者
RUN chown -R appuser:nodejs /app
USER appuser

# 设置环境变量默认值（可选）
ENV NODE_ENV=production
ENV PORT=3001

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["npm", "start"]