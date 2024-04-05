import {unlink, rmdir} from "@anio-fs/api/async"
import {getTypeOfPath} from "@anio-fs/path-type"
import {scandir} from "@anio-fs/scandir"

async function removeSymbolicLink(src) {
	await unlink(src)
}

async function removeFile(src) {
	await unlink(src)
}

async function removeDirectory(src) {
	await scandir(src, {
		async callback({type, relative_path, absolute_path}) {
			if (type === "link") {
				await removeSymbolicLink(absolute_path)
			} else if (type === "dir") {
				await removeDirectory(absolute_path)
			} else {
				await removeFile(absolute_path)
			}
		},
		reverse: true
	})

	await rmdir(src)
}

const remove_map = {
	"link->dir": removeSymbolicLink,
	"link->file": removeSymbolicLink,
	"link->broken": removeSymbolicLink,
	"file": removeFile,
	"dir": removeDirectory
}

export default async function(src) {
	const path_type = await getTypeOfPath(src)

	// 'src' does not exist
	if (path_type === false) {
		return
	}

	if (!(path_type in remove_map)) {
		throw new Error(`Don't know how to remove path of type '${path_type}'.`)
	}

	const remove_fn = remove_map[path_type]

	return await remove_fn(src)
}
