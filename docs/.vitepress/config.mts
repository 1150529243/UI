import { defineConfig } from "vitepress";
import { aiascom } from "../plugin/aiascom"; //引入插件
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ludashuai-UI",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          {
            text: "指南",
            items: [{ text: "Markdown Examples", link: "/markdown-examples" }],
          },
          { text: "Runtime API Examples", link: "/api-examples" },
          {
            text: "Basic基础组件",
            items: [
              { text: "Button 按钮", link: "guide/Button/index.md" },
              { text: "Input 按钮", link: "guide/Input/index.md" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  // 注册插件
  markdown:{
    config(md){
      md.use(aiascom)
    }
  }
});
