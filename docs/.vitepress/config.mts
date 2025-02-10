import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
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
              { text: "Button 按钮", link: "examples/Button" },
              { text: "Input 按钮", link: "examples/Input" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
