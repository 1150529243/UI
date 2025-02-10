#### 组件库搭建

pnpm -C xxx 执行目录执行命令 dev

pnpm -w -D 命令 -D 是指开发环境依赖

    docs  -- 文档目录
    internal  -- 打包目录
    packages  -- 组件目录
    play  -- 执行目录
    typings -- 声明文件  如 el-but  会提示 el-button

        constants -- 定义常量
        diractives -- 自定义指令
        theme-chalk -- 主题

gulp 适用于 是以任务为分 定义 task 每个任务干某某 是以这种按照任务走的
比较适用于打包字体 样式多一些 属于比较老的打包工具

el-ui 主要用 rollup 和 gulp 打包的

### 初始化调式后

    如在 play 中使用 components 的组件 需要在 play 目录执行添加模块命令
    添加 Button pnpm add @ludashuai-ui/components --filter @ludashuai-ui/play
    使用： 在play的mian.ts文件 声明import * as Com from "@ludashuai-ui/components";

### 打包

    在internal也要加上@vitejs-plugin-vue
    它的入口文件是在packages的ludashuai-desgin的index中
    先把compontnet的组件汇总到components.ts中 用数组装起来
    然后在index.ts进行循环注册组件

### 文档 docs

    用到vitrPress
    前端有三个技术  SSG静态网站生成器 SSR服务器渲染  SPA单页面


    安装

    ```sh
    npm i vitepress -D
    ```

    使用
    ```sh
    npx vitepress init  (启动.bin目录下的文件)


#### node版本不一样时 需要重新安装依赖  目前node 20.11.0
