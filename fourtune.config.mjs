import {generateFromTemplate} from "fourtune/autogenerate"

const asyncToSync = {
	"import {unlink, rmdir} from \"@anio-fs/api/async\"": "import {unlink, rmdir} from \"@anio-fs/api/sync\"",
	"import {scandir} from \"@anio-fs/scandir\"": "import {scandirSync} from \"@anio-fs/scandir\"",
	"import {getTypeOfPath} from \"@anio-fs/path-type\"": "import {getTypeOfPathSync} from \"@anio-fs/path-type\"",
	"async function removeSymbolicLink(": "function removeSymbolicLink(",
	"await unlink(src)": "unlink(src)",
	"async function removeFile(": "function removeFile(",
	"async function removeDirectory(": "function removeDirectory(",
	"await scandir(": "scandirSync(",
	"async callback({type, relative_path, absolute_path}) {": "callback({type, relative_path, absolute_path}) {",
	"await removeSymbolicLink(": "removeSymbolicLink(",
	"await removeDirectory(": "removeDirectory(",
	"await removeFile(": "removeFile(",
	"await rmdir": "rmdir",
	"export default async function": "export default function",
	"await getTypeOfPath(src)": "getTypeOfPathSync(src)",
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
