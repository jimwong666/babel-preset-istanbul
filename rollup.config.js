import fs from "fs";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
import rollupTypescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { terser } from "rollup-plugin-terser";
// import json from "@rollup/plugin-json";

const pkg = JSON.parse(
	fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const config = {
	// 入口文件，src/index.ts
	input: "src/index.ts",
	// 输出文件
	output: [
		// commonjs
		{
			// package.json 配置的 main 属性
			file: pkg.main,
			format: "cjs",
		},
	],
	plugins: [
		// 解析第三方依赖
		// resolve(),
		// 识别 commonjs 模式第三方依赖
		// commonjs(),
		// rollup 编译 typescript
		rollupTypescript(),
		// babel 配置
		babel({
			// 编译库使用 runtime
			babelHelpers: "runtime",
			// 只转换源代码，不转换外部依赖
			// exclude: "node_modules/**",
			// babel 默认不支持 ts 需要手动添加
			extensions: [...DEFAULT_EXTENSIONS, ".ts"],
		}),
		// json(),
		terser({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				warnings: false,
			},
		}),
	],
	external: ["@jimwong/babel-plugin-istanbul", "@babel/helper-plugin-utils"],
};

export default config;
