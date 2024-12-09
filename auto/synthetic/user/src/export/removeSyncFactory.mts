import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/removeSync.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathSyncFactory} from "@aniojs/node-fs-path-type"
import {scandirSyncCallbackFactory} from "@aniojs/node-fs-scandir"
// ^^^ dependencies declared via AnioJsDependencies type

/**
 * @brief Synchronously remove a path of any type.
 * @description
 * Synchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
declare function removeSync(
	input_path: string
) : undefined

/**
 * @brief
 * Create an instance of the function 'removeSync'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'removeSync'.
 */
export function removeSyncFactory(context: RuntimeWrappedContextInstance) : typeof removeSync {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathSyncFactory(context),
		scandir: scandirSyncCallbackFactory(context)
	}

	const project = getProject()
	const local_context : RuntimeWrappedContextInstance = {
		...context,
		_package: {
			name: project.package_json.name,
			version: project.package_json.version,
			author: project.package_json.author,
			license: project.package_json.license
		}
	}

	return function removeSync(input_path: string) : undefined {
		return implementation(local_context, dependencies, input_path)
	}
}
