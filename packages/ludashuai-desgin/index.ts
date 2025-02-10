import { version } from "os";
import components from "./components";

import type { App } from "vue";

// 循环注册  app.use之后会跳到Button目录下的inde.ts的app.component("ludashuai-button", Button);代码中
export default {
  version: "1.0.0",
  isInstall: false,
  install(app: App) {
    if (this.isInstall) return; //优化  以防重新注册
    components.forEach((item: any) => {
      app.use(item);
    });
    this.isInstall = true;
  },
};
