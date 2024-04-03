import nodeFsGetPathType from "@anio-node-foundation/fs-get-path-type"
import {scandir, scandirSync} from "@anio-fs/scandir"
import path from "node:path"

async function removeSymbolicLink(fs_object, src) {
	await fs_object.unlink(src)
}

async function removeFile(fs_object, src) {
	await fs_object.unlink(src)
}

async function removeDirectory(fs_object, src) {
	await scandir(src, {
		async callback({type, relative_path, absolute_path}) {
			const args = [fs_object, absolute_path]

			if (type === "link") {
				await removeSymbolicLink(...args)
			} else if (type === "dir") {
				await removeDirectory(...args)
			} else {
				await removeFile(...args)
			}
		},
		reverse: true
	})

	await fs_object.rmdir(src)
}

const remove_map = {
	"link->dir": removeSymbolicLink,
	"link->file": removeSymbolicLink,
	"link->broken": removeSymbolicLink,
	"file": removeFile,
	"dir": removeDirectory
}

export default async function(fs_object, src) {
	const path_type = await nodeFsGetPathType(src)

	// 'src' does not exist
	if (path_type === false) {
		return
	}

	if (!(path_type in remove_map)) {
		throw new Error(`Don't know how to remove path of type '${path_type}'.`)
	}

	const remove_fn = remove_map[path_type]

	return await remove_fn(fs_object, src)
}
