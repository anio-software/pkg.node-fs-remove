import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"

import type {RemoveOptions as Options} from "#~export/RemoveOptions.ts"
//>import type {RemoveSyncOptions as Options} from "#~export/RemoveSyncOptions.ts"
import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import {removeAnything} from "#~src/removeAnything.ts"
//>import {removeAnythingSync as removeAnything} from "#~src/removeAnythingSync.ts"
import {rmdir} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {rmdir} from "@anio-software/pkg-private.node-consistent-fs/sync"

import {getOrCreateError} from "@anio-software/pkg.js-utils"
import path from "node:path"

export async function removeDirectory(
//>export function removeDirectorySync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	pathToRemove: string,
	options: Options|undefined
): Promise<boolean> {
//>): boolean {
	context.log.debug(`removing directory '${pathToRemove}'`)

	try {
		const result = await dependencies.scandirCallback(
//>		const result = dependencies.scandirCallback(
			pathToRemove, {
				reverse: true,
				maxDepth: 0,
				async callback(entry, {stopLoop}) {
//>				callback(entry, {stopLoop}) {
					const result = await removeAnything(
//>					const result = removeAnything(
						context,
						dependencies,
						path.join(pathToRemove, entry.relativePath),
						options,
						entry.pathType
					)

					if (!result) {
						return stopLoop(false)
					}

					return undefined
				}
			}
		)

		if (!result) return false

		await rmdir(pathToRemove)
//>		rmdir(pathToRemove)

		return true
	} catch (e) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}' while removing directory '${pathToRemove}'`)

		return false
	}
}
