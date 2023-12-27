import babelPluginIstanbul from "@jimwong/babel-plugin-istanbul";
import { declarePreset } from "@babel/helper-plugin-utils";

export default declarePreset((api: any) => {
	api.assertVersion(7); // 确保兼容 Babel 7.x

	return {
		// 预设或插件的配置
		plugins: [[babelPluginIstanbul]].filter(Boolean),
	};
});
