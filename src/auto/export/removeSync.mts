import factory from "./removeSyncFactory.mts"

const impl = factory()

/**
 * @brief Synchronously remove a path of any type.
 * @description
 * Synchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export default function(src : string) : void {
	impl(src)
}
