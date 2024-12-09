import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/remove.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathFactory} from "@aniojs/node-fs-path-type"
import {scandirCallbackFactory} from "@aniojs/node-fs-scandir"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

/**
 * @brief Asynchronously remove a path of any type.
 * @description
 * Asynchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
declare function remove(
	input_path: string
) : Promise<undefined>

/**
 * @brief
 * Create an instance of the function 'remove'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'remove'.
 */
export function removeFactory(context: RuntimeWrappedContextInstance) : typeof remove {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathFactory(context),
		scandir: scandirCallbackFactory(context)
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

	return async function remove(input_path: string) : Promise<undefined> {
		return await implementation(local_context, dependencies, input_path)
	}
}
