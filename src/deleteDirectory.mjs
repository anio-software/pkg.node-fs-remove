import nodeFsScandirSync from "@anio-js-core-foundation/node-fs-scandir-sync"
import fs from "node:fs"

import deleteSymbolicLink from "./deleteSymbolicLink.mjs"
import deleteFile from "./deleteFile.mjs"

export default function(path) {
	const entries = nodeFsScandirSync.reverse(path)

	for (const entry of entries) {
		if (entry.type === "link") {
			deleteSymbolicLink(entry.absolute_path)
		} else if (entry.type === "dir") {
			fs.rmdirSync(entry.absolute_path)
		} else {
			deleteFile(entry.absolute_path)
		}
	}

	fs.rmdirSync(path)
}
