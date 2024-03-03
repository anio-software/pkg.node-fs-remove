import nodeFsGetPathType from "@anio-node-foundation/fs-get-path-type"
import nodeFsScandir from "@anio-node-foundation/fs-scandir"
import path from "node:path"

function removeSymbolicLink(fs_object, src) {
	fs_object.unlink(src)
}

function removeFile(fs_object, src) {
	fs_object.unlink(src)
}

function removeDirectory(fs_object, src) {
	nodeFsScandir.sync(src, {
		callback({type, relative_path, absolute_path}) {
			const args = [fs_object, absolute_path]

			if (type === "link") {
				removeSymbolicLink(...args)
			} else if (type === "dir") {
				removeDirectory(...args)
			} else {
				removeFile(...args)
			}
		},
		reverse: true
	})

	fs_object.rmdir(src)
}

const remove_map = {
	"link->dir": removeSymbolicLink,
	"link->file": removeSymbolicLink,
	"link->broken": removeSymbolicLink,
	"file": removeFile,
	"dir": removeDirectory
}

export default function(fs_object, src) {
	const path_type = nodeFsGetPathType.sync(src)

	// 'src' does not exist
	if (path_type === false) {
		return
	}

	if (!(path_type in remove_map)) {
		throw new Error(`Don't know how to remove path of type '${path_type}'.`)
	}

	const remove_fn = remove_map[path_type]

	return remove_fn(fs_object, src)
}
