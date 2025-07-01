import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {PathType} from "@anio-software/pkg.node-fs-path-type"

import type {RemoveOptions as Options} from "#~export/RemoveOptions.ts"
//>import type {RemoveSyncOptions as Options} from "#~export/RemoveSyncOptions.ts"
import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import {removeDirectory} from "#~src/removeDirectory.ts"
//>import {removeDirectorySync as removeDirectory} from "#~src/removeDirectorySync.ts"
import {removeFile} from "#~src/removeFile.ts"
//>import {removeFileSync as removeFile} from "#~src/removeFileSync.ts"

import {isFunction} from "@anio-software/pkg.is"

export async function removeAnything(
//>export function removeAnythingSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	pathToRemove: string,
	options: Options|undefined,
	pathType: PathType
): Promise<boolean> {
//>): boolean {
	if (isFunction(options?.shouldRemoveEntry)) {
		const shouldBeRemoved = await options.shouldRemoveEntry(
//>		const shouldBeRemoved = options.shouldRemoveEntry(
			pathToRemove, pathType
		)

		if (shouldBeRemoved !== true) {
			context.log.debug(`skipping '${pathToRemove}'`)

			return true
		}
	}

	if (pathType === "dir:regular") {
		return await removeDirectory(
//>		return removeDirectory(
			context,
			dependencies,
			pathToRemove,
			options
		)
	}

	return await removeFile(
//>	return removeFile(
		context,
		dependencies,
		pathToRemove,
		options
	)
}
