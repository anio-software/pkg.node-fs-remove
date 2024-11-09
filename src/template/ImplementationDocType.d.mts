/* define and describe your function api here */
export type ImplementationDocType = {
	/**
	 * @brief Asynchronously remove a path of any type.
//>	 * @brief Synchronously remove a path of any type.
	 * @description
	 * Asynchronously removes the entry located at `path`.
//>	 * Synchronously removes the entry located at `path`.
	 * This function does not throw if `path` does not exist.
	 * @param path The path to be deleted.
	 */
       (src : string) : Promise<void>
//>     (src : string) : void
}
