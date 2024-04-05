import {unlink, rmdir} from "@anio-fs/api/sync"
import {getTypeOfPathSync} from "@anio-fs/path-type"
import {scandirSync} from "@anio-fs/scandir"

function removeSymbolicLink(src) {
	unlink(src)
}

function removeFile(src) {
	unlink(src)
}

function removeDirectory(src) {
	scandirSync(src, {
		callback({type, relative_path, absolute_path}) {
			if (type === "link") {
				removeSymbolicLink(absolute_path)
			} else if (type === "dir") {
				removeDirectory(absolute_path)
			} else {
				removeFile(absolute_path)
			}
		},
		reverse: true
	})

	rmdir(src)
}

const remove_map = {
	"link->dir": removeSymbolicLink,
	"link->file": removeSymbolicLink,
	"link->broken": removeSymbolicLink,
	"file": removeFile,
	"dir": removeDirectory
}

export default function(src) {
	const path_type = getTypeOfPathSync(src)

	// 'src' does not exist
	if (path_type === false) {
		return
	}

	if (!(path_type in remove_map)) {
		throw new Error(`Don't know how to remove path of type '${path_type}'.`)
	}

	const remove_fn = remove_map[path_type]

	return remove_fn(src)
}
