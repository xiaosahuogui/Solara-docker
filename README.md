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

5. 查看日志
docker compose logs -f

探索雷达功能做了修改，默认使用kuwo搜索20首音乐自动播放，播放列表快结束时静默添加歌曲。歌曲关键词库在index.js文件中，可以自行修改。

部署完可以使用自己的网站反向代理 http://127.0.0.1:3001

然后就可以通过访问自己的网站来听歌了。
