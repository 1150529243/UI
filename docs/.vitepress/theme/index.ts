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