# vue-music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 学习心得
> 1.通用组件与页面组件的区别,src/base目录下为通用组件（木偶组件）,src/components目录下为页面组件（智能组件）是有业务逻辑的。
> 2.巧用vue的mixin属性将重复的业务逻辑代码提炼出来。
> 3.利用vue-lazyload进行懒加载,优化首屏时间。
> 4.利用better-scroll进行了滚动组件的制作,在scr/base/scroll;
> 5.学会了h5 audio标签进行播放器内核开发,onplay（准备好播放）,ontimeupdate（获取播放乐曲的当前时间）,onended（音乐播放结束）事件的运用。
> 6.路由按需加载,通过resolve=>{import(组件路径).then(module=>{resolve(module)})}进行模块引用。
> 7.需要设置headers请求源时可以通过重新在搭建一个服务将qq音乐的数据获取到,然后在本地开启api接口,dev模式下,在build/webpack.dev.conf.js文件下重新启动express路由,在devServer.before下暴露api接口。
> 8.项目完成时,执行npm run build,在根目录下重启服务server.js,执行node server命令,其中server中引入了compression模块进行gzip压缩来优化应用响应速度。


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
