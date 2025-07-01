import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {RemoveOptions as Options} from "#~export/RemoveOptions.ts"
//>import type {RemoveSyncOptions as Options} from "#~export/RemoveSyncOptions.ts"
import type {__EnkoreFunctionDependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies} from "#~src/DependenciesSync.ts"
import {removeAnything} from "#~src/removeAnything.ts"
//>import {removeAnythingSync as removeAnything} from "#~src/removeAnythingSync.ts"

export type {__EnkoreFunctionDependencies}

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	pathToRemove: string,
	options?: Options|undefined
): Promise<boolean> {
//>): boolean {
	const context = createContext(contextOptions, 0)

	const pathType = await dependencies.getTypeOfPath(pathToRemove)
//>	const pathType = dependencies.getTypeOfPath(pathToRemove)

	if (options?.force === true && pathType === "nonExisting") {
		return true
	}

	return await removeAnything(
//>	return removeAnything(
		context,
		dependencies,
		pathToRemove,
		options,
		pathType
	)
}
