import {removeFactory as factory} from "./removeFactory.mts"
//import {removeSyncFactory as factory} from "./removeSyncFactory.mts"

const impl = factory()

/**
 * @brief Asynchronously remove a path of any type.
// * @brief Synchronously remove a path of any type.
 * @description
 * Asynchronously removes the entry located at `path`.
// * Synchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export async function remove(src : string) : Promise<void> {
//export function removeSync(src : string) : void {
	await impl(src)
//	impl(src)
}
