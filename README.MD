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

### Button样式赋能
    1.先把Buttno模块引入到docs中 

    ```sh
    pnpm add @ludashuai-ui/components --filter @ludashuai-ui/docs
    ```

    1.1  internal>components>Button>src>index.vue
    ```js
    <template>
        <button>{{ props.text }}</button>
    </template>

    <script setup lang="ts">
        import {defineOptions} from 'vue'
        const props = defineProps({
            type: {
                type: String,
                default: 'default'
            },
            text: {
                type: String,
                default: '按钮'
            }
        })

        // vue3.4 新增的编译宏
        defineOptions({
            name:'ludashuai-Button'
        })
    </script>

    <style></style>
    ```

     1.2  docs>guide>Button>index.md
     ```text
        ### Button
        Commonly used button.

        Basic usage
        :::demo Use type, plain, round and circle to define Button's style.

        button/basic

        :::
     ```

     1.3  docs>examples>Button>index.vue
     ```js
        <ludashuai-Button text="11"></ludashuai-Button>
        <ludashuai-Button text="22"></ludashuai-Button>
        <ludashuai-Button text="33"></ludashuai-Button>
     ```

     1.4  docs>theme>index.ts
     ```js
        import DefaultTheme from 'vitepress/theme'
        import type { Theme } from 'vitepress'
        import * as ludashuaiUI from '@ludashuai-ui/components'

        export default <Theme> {
            ...DefaultTheme,
            enhanceApp({app}){
                // 确保组件名称存在  注册全局组件app 就是vue的app  把internal的Button注册到docs里面来
                if (ludashuaiUI.Button.name) {
                    app.component(ludashuaiUI.Button.name, ludashuaiUI.Button)
                }
            }
        }
     ```

    2.把docs目录中的examples对应vue文件替换到guide的md文件  
        这个需要编写plugin插件实现
    
    2.1 注册插件confg.mts

    ```js
        import { aiascom } from "../plugin/aiascom"; //引入插件

        // 注册插件
        themeConfig:{...},
        markdown:{
            config(md){
            md.use(aiascom)
            }
        }
    ```

    2.2 安转 pnpm i  markdown-it 基于这个库实现
        就是markdown解析器 把markdown语法转成html
        以及容器  pnpm i  markdown-it-container


    2.3插件 plugin>index.ts.
            
        ```js
            import  MarkdownIt from 'markdown-it'
            import mdContainer from 'markdown-it-container'
            import fs from 'fs'
            import path from 'path'

            export const aiascom = (md)=>{
                console.log(md)

                // 编写自定义模块
                // 第一个参数是容器
                md.use(mdContainer,'div',{
                    validate:(params) => params.trim().match(/^demo\s*(.*)$/),  //匹配
                    render(tokens,index){
                        const sourceFile = tokens[index + 2]
                        let source;
                        if(sourceFile && sourceFile.type == 'inline'){
                            // console.log(sourceFile.content)
                            source = fs.readFileSync(path.resolve(__dirname,`../examples/${sourceFile.content}.vue`))
                        }

                        return source
                    }
                })
            }

        ```
        


    