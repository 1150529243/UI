import path from "path";

// 根目录 comp2
export const ROOT = path.resolve(__dirname, "..", "..");

// ludashuai-desgin 目录
export const ERROOT = path.resolve(ROOT, "packages");

// 入口
export const ENTRY = path.resolve(ERROOT, "ludashuai-desgin"); //它会自己找到index.ts文件

//出口
export const OUTPUT_DIR = path.resolve(ROOT, "dist");

//types
export const TYPES = path.resolve(OUTPUT_DIR, "types");

// tsconfig.web.json
export const TSWEBCONFIG = path.resolve(ROOT, "tsconfig.web.json");

//扫描文件的规则
export const GLOD_PATTERN = "**/*.{js?(x),ts?(x),vue}";
