import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

import {removeFactory as factory} from "#~synthetic/user/export/removeFactory.mts"

let __fnImplementation: any = null

/**
 * @brief Asynchronously remove a path of any type.
 * @description
 * Asynchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export async function remove(input_path: string) : Promise<undefined> {
	if (__fnImplementation === null) __fnImplementation = factory(createContext());

	return await __fnImplementation(input_path)
}
