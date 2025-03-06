import {createContext} from "@fourtune/realm-js/v0/runtime"

import {removeSyncFactory as factory} from "#~synthetic/user/export/removeSyncFactory.mts"

/**
 * @brief Synchronously remove a path of any type.
 * @description
 * Synchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export function removeSync(input_path: string) : undefined {
	const __fnImplementation = factory(createContext())

	return __fnImplementation(input_path)
}
