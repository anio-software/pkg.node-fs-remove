import nodeFsGetPathTypeSync from "@anio-js-core-foundation/node-fs-get-path-type-sync"

import deleteSymbolicLink from "./deleteSymbolicLink.mjs"
import deleteFile from "./deleteFile.mjs"
import deleteDirectory from "./deleteDirectory.mjs"

const remove_fn = {
	"link->dir": deleteSymbolicLink,
	"link->file": deleteSymbolicLink,
	"link->broken": deleteSymbolicLink,
	"file": deleteFile,
	"dir": deleteDirectory
}

export default function(path) {
	const path_type = nodeFsGetPathTypeSync(path)

	//
	// do nothing if path doesn't exist
	//
	if (path_type === false) {
		return
	} else if (!(path_type in remove_fn)) {
		throw new Error(`I don't know how to remove a path of type '${path_type}'.`)
	}

	const fn = remove_fn[path_type]

	return fn(path)
}
