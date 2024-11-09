/* define and describe your function api here */
export type ImplementationDocType = {
	/**
	 * @brief Synchronously remove a path of any type.
	 * @description
	 * Synchronously removes the entry located at `path`.
	 * This function does not throw if `path` does not exist.
	 * @param path The path to be deleted.
	 */
     (src : string) : void
}
