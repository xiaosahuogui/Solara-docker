基于https://github.com/akudamatata/Solara  项目进行修改，感谢原作者的无私分享。

部署方法(仅针对VPS，如果是使用软路由等部署，请根据实际情况调整docker-compose文件）

一、使用Dockerfile进行部署：

1. 在VPS上创建solara目录，将所有文件上传到solara文件夹中。

2. 进入项目目录

cd solara

3. 创建docker-compose.yml文件,填入"Dockerfile部署-docker-compose.yml"中的内容并修改以下两项内容：
   
- SOLARA_PASSWORD=solara123  # 修改为你的密码
- SESSION_SECRET=KLmlKDruIBRYjrT5ct7B3xqG25ZF2p59    # 修改为随机字符串

4. 构建项目
docker compose build

5. 启动服务
docker compose up -d

6. 如果修改了文件需要重新部署
   
docker compose down

compose build --no-cache

docker compose up -d

二、拉取Docker镜像部署：

1. 创建solara文件夹并进入文件夹
2. 创建docker-compose.yml文件,填入"Docker镜像部署-docker-compose.yml"中的内容并修改密码
3. docker compose pull
4. docker compose up -d
5. 使用网站反代 127.0.0.1:3001

近期修改：
1. 使用GD音乐台API接口，对移动端界面做了调整。
2. 播放时遇到加载失败或播放进度卡住时，尝试降低音质，如果还是无法播放就跳过，播放下一首。
3. 探索雷达功能做了修改，默认使用 wy 搜索两个关键词，筛选10首音乐自动播放，播放列表快结束时静默添加10首歌曲。
4. 探索雷达的歌曲关键词库在/public/js/index.js文件中,找到 const RADAR_KEYWORDS 即可自行修改。
5. 由于我不喜欢听remix和翻唱，探索雷达搜索结果添加了屏蔽关键词库，在index.js中找到
   const BLOCKED_KEYWORDS 可自行修改，如果不想使用这个功能，可以留空，设置为：

const BLOCKED_KEYWORDS = [
    // 清空所有关键词，这样就不会过滤任何歌曲
];

6. 搜索结果界面添加了播放全部按钮，可以一键播放页面已加载的所有歌曲。
7. 添加密码验证，只有输入密码登录才能使用。
8. 移动端页面风格改了下，添加了播放列表自动定位到正在播放的歌曲。如果不喜欢这个风格或者有其他问题，请自己修改mobile.css文件。
### 💻 桌面端页面截图
<p align="center">
  <img src="https://github.com/user-attachments/assets/5f6b5d5c-7ec6-45a4-a1f5-c58567b4b99e" alt="Desktop Screenshot" width="90%">
</p>
### 📱 移动端页面截图
<p align="center">
   <img src="https://github.com/user-attachments/assets/7ca86a1b-3120-43ac-acf6-f782fc4f4db0" alt="Mobile Screenshot 4" width="22%">
   <img src="https://github.com/user-attachments/assets/21a5b03e-cda1-4004-987f-d5a7c026a886" alt="Mobile Screenshot 3" width="22%">
   <img src="https://github.com/user-attachments/assets/8c5b9e0a-a6fd-4b59-9949-b7b658f3d2e0" alt="Mobile Screenshot 2" width="22%"> 
   <img src="https://github.com/user-attachments/assets/48db7dcd-b9e6-4228-a38a-dbc15cd9731b" alt="Mobile Screenshot 1" width="22%">
</p>


部署完可以使用自己的域名反向代理 http://127.0.0.1:3001

然后就可以通过访问自己的域名来听歌了。（PS：免费音源的API接口时不时的就会抽下风，没啥好办法）

## 许可协议

本项目基于 [Solara](https://github.com/akudamatata/Solara)（作者：akudamatata）进行衍生开发。
本项目采用 CC BY-NC-SA 协议，禁止任何商业化行为。
