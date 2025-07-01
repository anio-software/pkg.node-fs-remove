import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"

import type {RemoveOptions as Options} from "#~export/RemoveOptions.ts"
//>import type {RemoveSyncOptions as Options} from "#~export/RemoveSyncOptions.ts"
import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import {unlink} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {unlink} from "@anio-software/pkg-private.node-consistent-fs/sync"

import {getOrCreateError} from "@anio-software/pkg.js-utils"

export async function removeFile(
//>export function removeFileSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	pathToRemove: string,
	options: Options|undefined
): Promise<boolean> {
//>): boolean {
	context.log.debug(`removing file '${pathToRemove}'`)

	try {
		await unlink(pathToRemove)
//>		unlink(pathToRemove)

		return true
	} catch (e) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}' while removing file '${pathToRemove}'`)

		return false
	}
}
