import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import {unlink, rmdir} from "@aniojs-private/node-async-sync-fs/sync"

import {getTypeOfPathSync as getTypeOfPath} from "@aniojs/node-fs-path-type"

import {scandirSyncCallback as scandirCallback} from "@aniojs/node-fs-scandir"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath,
	scandir: typeof scandirCallback
}

function removeDirectory(
	dependencies : AnioJsDependencies,
	src : string
) {
	const {scandir} = dependencies

	scandir(src, {
		callback({type, absolute_path}) {
			if (
				type === "linkToDir" ||
				type === "linkToFile" ||
				type === "brokenLink"
				) {
				unlink(absolute_path)
			} else if (type === "regularDir") {
				removeDirectory(dependencies, absolute_path)
			} else {
				unlink(absolute_path)
			}
		},
		reverse: true
	})

	rmdir(src)
}

/**
 * @brief Synchronously remove a path of any type.
 * @description
 * Synchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_path: string
) : undefined {
	const context = useContext(wrapped_context, 0)

	context.log.debug(`removing "${input_path}"`)

	const path_type = dependencies.getTypeOfPath(input_path)

	if (path_type === "nonExisting") return

	switch (path_type) {
		case "linkToDir":
		case "linkToFile":
		case "brokenLink": {
			unlink(input_path)

			return
		}

		case "regularDir": {
			removeDirectory(dependencies, input_path)

			return
		}
	}

	unlink(input_path)
}
