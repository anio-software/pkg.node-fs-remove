import {generateFromTemplate} from "vipen/autogenerate"

const asyncToSync = {
	"import {scandir} from \"@anio-fs/scandir\"": "import {scandirSync} from \"@anio-fs/scandir\"",
	"async function removeSymbolicLink(": "function removeSymbolicLink(",
	"await fs_object.unlink(src)": "fs_object.unlink(src)",
	"async function removeFile(": "function removeFile(",
	"async function removeDirectory(": "function removeDirectory(",
	"await scandir(": "scandirSync(",
	"async callback({type, relative_path, absolute_path}) {": "callback({type, relative_path, absolute_path}) {",
	"await removeSymbolicLink(": "removeSymbolicLink(",
	"await removeDirectory(": "removeDirectory(",
	"await removeFile(": "removeFile(",
	"await fs_object.rmdir": "fs_object.rmdir",
	"export default async function": "export default function",
	"await nodeFsGetPathType(src)": "nodeFsGetPathType.sync(src)",
	"await remove_fn": "remove_fn"
}

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"sync.mjs": generateFromTemplate("src/template.mjs", asyncToSync),
		"async.mjs": generateFromTemplate("src/template.mjs", {})
	}
}
