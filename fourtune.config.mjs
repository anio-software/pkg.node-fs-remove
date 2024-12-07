import {generateFactoryFiles} from "@fourtune/realm-js/v0/autogenerate"

export default {
	realm: {
		name: "js",
		type: "package"
	},

	autogenerate: {
		...generateFactoryFiles({
			source_file: "src/__removeXXX.as.mts",
			export_name: "removeXXX",
			destination: "src/export"
		})
	}
}
