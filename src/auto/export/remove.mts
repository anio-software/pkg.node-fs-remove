import {removeFactory as factory} from "./removeFactory.mts"

const impl = factory()

/**
 * @brief Asynchronously remove a path of any type.
 * @description
 * Asynchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export async function remove(src : string) : Promise<void> {
	await impl(src)
}
