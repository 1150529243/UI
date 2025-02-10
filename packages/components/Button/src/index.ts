import Button from "./index.vue";
import type { App } from "vue";

// 按需引入
export { Button };

// 全量引入
export default {
  install(app: App) {
    // 注册组件
    app.component("ludashuai-button", Button);
  },
};
