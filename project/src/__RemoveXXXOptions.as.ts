import type {PathType} from "@anio-software/pkg.node-fs-path-type"

export type __XX__ = {
	/**
	 * @brief Decide whether to remove an entry or not.
	 */
	shouldRemoveEntry?: (
		relativeSourcePath: string,
		pathType: PathType
	) => Promise<boolean> | boolean
//>	) => boolean

	/**
	 * @brief Ignore non existing paths.
	 */
	force?: boolean
}
