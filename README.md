<!-- Nginx -->

查看进程

```
ps -ef | grep nginx
```

<!-- Mac系统查看端口占用和杀死进程 -->

```
lsof -i tcp:8080
```

<!-- 启动服务 -->

- nginx -P 8082
- http-server -P 8081
- server -P 8080
