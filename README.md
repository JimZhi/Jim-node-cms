# Jim-node-cms

## 简介

基于[node Koa mySql2](主要是为了学习node、Koa)开发，从后端角度实现了以下几个功能：用户管理系统（帐号注册、登录功能）、内容管理系统（文章发布）、内容评论管理（一篇文章多个用户评论）、内容标签管理（内容分类）、文件管理系统（图片文件上传）。使用分层架构进行代码拆分。

实例：userRouter.post('/', verifyUser, handlePassword, userController.create)

1. 触发注册接口 user.router.js [router]
2. 中间件帐号密码验证、密码加密 user.middleware.js [middleware]
3. 验证成功后。需要写入数据库 user.controller.js [controller]
4. 数据库写入操作 user.service.js [service]

## 功能接口说明

```
- 1. 注册功能
-- 中间件实现帐号验证
-- md5password密码加密
-- 错误统一处理

- 2. 登录功能
-- 登录凭证[token颁发与验证]
-- 对token进行非对称加密 【私钥 公钥】

- 权限
- 动态路由
- echarts各种图表
- arcgis地图
- 克里金插值分析图
- 全景图
- 富文本
- Markdown
- 错误页面 403 404 500
- 个人设置
- 系统设置
- 更换主题
- 两种布局方式
- 面包屑
- 标签页
- webSocket
- svg图标
- 全屏
- 返回顶部
- webpack优化
- 抽奖页
- table表
- form表单
- 上传Excel
- 上传头像和裁剪
- htmlcanvas2截屏
- 封装自定义loading
```

### 文件目录说明

```
├── src
│  ├── app                           ---app创建、中间件使用
│  ├── config                        ---服务端口常量
│  ├── router                        ---路由对象创建
│  ├── controller                    ---路由接口回调处理
│  ├── service                       ---数据库处理操作
│  ├── middleware                    ---接口中间件验证逻辑
│  ├── utils                         ---公共方法
│  ├── main.js
├── .env                             ---常量定义
├──  package.json
├──  package-lock.json
├──  README.md


```
