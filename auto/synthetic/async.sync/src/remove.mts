import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import {unlink, rmdir} from "@aniojs-private/node-async-sync-fs/async"

import {getTypeOfPath} from "@aniojs/node-fs-path-type"

import {scandirCallback} from "@aniojs/node-fs-scandir"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath,
	scandir: typeof scandirCallback
}

async function removeDirectory(
	dependencies : AnioJsDependencies,
	src : string
) {
	const {scandir} = dependencies

	await scandir(src, {
		async callback({type, absolute_path}) {
			if (
				type === "linkToDir" ||
				type === "linkToFile" ||
				type === "brokenLink"
				) {
				await unlink(absolute_path)
			} else if (type === "regularDir") {
				await removeDirectory(dependencies, absolute_path)
			} else {
				await unlink(absolute_path)
			}
		},
		reverse: true
	})

	await rmdir(src)
}

/**
 * @brief Asynchronously remove a path of any type.
 * @description
 * Asynchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_path: string
) : Promise<undefined> {
	const context = useContext(wrapped_context, 0)

	context.log.debug(`removing "${input_path}"`)

	const path_type = await dependencies.getTypeOfPath(input_path)

	if (path_type === "nonExisting") return

	switch (path_type) {
		case "linkToDir":
		case "linkToFile":
		case "brokenLink": {
			await unlink(input_path)

			return
		}

		case "regularDir": {
			await removeDirectory(dependencies, input_path)

			return
		}
	}

	await unlink(input_path)
}
