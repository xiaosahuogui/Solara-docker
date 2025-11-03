基于https://github.com/akudamatata/Solara项目进行修改

使用Dockerfile进行部署，可以部署在VPS上，默认监听3001端口。

部署方法：
 
1. 在VPS上创建solara-music目录，这里我是在/opt目录下创建的，将所有文件上传到solara-music文件夹中。

2. 进入项目目录

cd /opt/solara-music

3. 构建项目
docker compose build

4. 启动服务
docker compose up -d

5. 如果修改了文件需要重新部署
   
docker compose down

compose build --no-cache

docker compose up -d

近期修改：
1. 探索雷达功能做了修改，默认使用kuwo搜索两个关键词，筛选30首音乐自动播放，播放列表快结束时静默添加20首歌曲。
2. 探索雷达的歌曲关键词库在/public/js/index.js文件中,找到 const RADAR_KEYWORDS 即可自行修改。
3. 由于我不喜欢听remix和翻唱，探索雷达搜索结果添加了屏蔽关键词库，在index.js中找到
      const BLOCKED_KEYWORDS 可自行修改，如果不想使用这个功能，可以留空，设置为：

const BLOCKED_KEYWORDS = [
    // 清空所有关键词，这样就不会过滤任何歌曲
];

4. 搜索结果界面添加了播放全部按钮，可以一键播放页面已加载的所有歌曲。


部署完可以使用自己的域名反向代理 http://127.0.0.1:3001

然后就可以通过访问自己的域名来听歌了。
