/**
 * @brief Asynchronously remove a path of any type.
 * @description
 * Asynchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export function remove(path : string) : Promise<void>;

/**
 * @brief Synchronously remove a path of any type.
 * @description
 * Synchronously removes the entry located at `path`.
 * This function does not throw if `path` does not exist.
 * @param path The path to be deleted.
 */
export function removeSync(path : string) : void;
