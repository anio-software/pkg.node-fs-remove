import {generateSyncAsyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/removeFactory.mts": generateSyncAsyncVariant("template/removeFactory.mts", "async"),
		"export/removeSyncFactory.mts": generateSyncAsyncVariant("template/removeFactory.mts", "sync"),

		"export/remove.mts": generateSyncAsyncVariant("template/remove.mts", "async"),
		"export/removeSync.mts": generateSyncAsyncVariant("template/remove.mts", "sync"),
	}
}
