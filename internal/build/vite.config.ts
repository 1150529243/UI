import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as compiler from "vue/compiler-sfc";
import {
  ENTRY,
  OUTPUT_DIR,
  TYPES,
  TSWEBCONFIG,
  GLOD_PATTERN,
  ROOT,
  ERROOT,
} from "../build-contstants";
import { Plugin } from "vite";
import { Project } from "ts-morph"; //用于ts编译  相当于ts的babel  进行抽象语法树解析
import { glob } from "fast-glob"; //扫描文件
import * as fs from "node:fs";
import path from "node:path";

// 给声明文件打包   写插件
// 因为要放入dist目录  需要vite打包生成dist文件后 再进行操作
const vitePluginsTypes = (): Plugin => {
  return {
    name: "vite-plugin-types",
    apply: "build",
    closeBundle: async () => {
      //打完包之后就会走这个钩子
      console.log("打完包了之后");
      const project = new Project({
        compilerOptions: {
          emitDeclarationOnly: true, //只生成声明文件
          outDir: TYPES, //输出目录
          skipLibCheck: true, //跳过  d.ts文件检查  增加编译速度
        },
        tsConfigFilePath: TSWEBCONFIG, //基于tsconfig.web.json 文件规则
        skipAddingFilesFromTsConfig: true, //跳过其他tsconfig.json文件的检查  如现在掉过tsconfig.base.json检查
      });

      // 需要添加源文件  循环packages 文件下所有目录
      // 第一个参数就是扫描的规则  第二个参数就是排除的目录
      // onlyFiles只扫描文件   onlyFiles 读取绝对路径
      const files = await glob([GLOD_PATTERN, "!ludashuai-desgin"], {
        cwd: ERROOT,
        onlyFiles: true,
        absolute: true,
      });
      const epPaths = await glob([GLOD_PATTERN], {
        cwd: ENTRY,
        onlyFiles: true,
      });
      files.forEach((file) => {
        if (file.endsWith(".vue")) {
          // 提取vue里面的script  template style不认识
          const content = fs.readFileSync(file, "utf-8");
          const sfc = compiler.parse(content);
          // console.log(sfc);
          const { scriptSetup, script } = sfc.descriptor;
          // 支持vue中script的两种写法  1.setup语法糖 和 2.export default { setup(){ retunr{} } }(setup函数模式)
          if (script || scriptSetup) {
            let tscode = script?.content ?? ""; //处理setup函数模式

            // 处理setup 语法糖模式
            if (scriptSetup) {
              // 因为有可能有defineProps 这种编译宏   define开头的都是编译宏
              // 所以把它改变成setup函数模式的代码
              tscode += compiler.compileScript(sfc.descriptor, { id: "xxx" });

              // 添加到源代码
              const lang = sfc.descriptor.scriptSetup ? "ts" : "js";
              // 通过lang处理假装是一个ts文件  然后通过代码生成声明文件
              project.createSourceFile(
                `${path.relative(process.cwd(), file)}.${lang}`,
                tscode
              );
            }
          }
        } else {
          // ts文件  认识
          project.addSourceFileAtPath(file); //添加源文件
        }
      });

      // ludashuai-desgin
      epPaths.forEach((file) => {
        project.addSourceFileAtPath(path.resolve(ENTRY, file)); //添加源文件
      });

      // 生成文件
      project.emit({
        emitOnlyDtsFiles: true, //只生成声明文件
      });
    },
  };
};

export default defineConfig({
  plugins: [vue(), vitePluginsTypes()],
  build: {
    lib: {
      entry: ENTRY, // 入口
      formats: ["es", "cjs", "iife", "umd"],
      name: "ludashuai",
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
    },
    outDir: OUTPUT_DIR, //出口
    // rollup 打包配置  vite打包是基于rollup的  这个配置相当于把参数透传给rollup
    rollupOptions: {
      external: ["vue"], //忽略vue打包  因为用于vue  不忽略就多了一份
      output: {
        globals: {
          vue: "Vue", // 适应iif  vue改写成Vue
        },
      },
    },
  },
});
