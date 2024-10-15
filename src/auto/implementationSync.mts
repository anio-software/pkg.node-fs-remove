/* -------- required imports by template -------- */
import type {ContextInstanceType} from "@fourtune/realm-js"
import type {DependenciesType} from "#/auto/DependenciesSyncType.d.mts"

import type {ImplementationDocType} from "#/auto/ImplementationSyncDocType.d.mts"
/* -------- required imports by template -------- */

import {unlink, rmdir} from "@anio-fs/api/sync"

import {PathType} from "@anio-fs/path-type"

function removeDirectory(
	dependencies : DependenciesType,
	src : string
) {
	const {scandir} = dependencies

	scandir(src, {
		callback({type, absolute_path}) {
			if (
				type === PathType.linkToDir ||
				type === PathType.linkToFile ||
				type === PathType.brokenLink
				) {
				unlink(absolute_path)
			} else if (type === PathType.regularDir) {
				removeDirectory(dependencies, absolute_path)
			} else {
				unlink(absolute_path)
			}
		},
		reverse: true
	})

	rmdir(src)
}

function removeImplementation(
	context : ContextInstanceType,
	dependencies : DependenciesType,
	src : string,
) : void {
	context.log.debug(`removing "${src}"`)

	const path_type = dependencies.getTypeOfPath(src)

	if (path_type === PathType.nonExisting) return

	switch (path_type) {
		case PathType.linkToDir:
		case PathType.linkToFile:
		case PathType.brokenLink: {
			unlink(src)

			return
		}

		case PathType.regularDir: {
			removeDirectory(dependencies, src)

			return
		}
	}

	unlink(src)
}

export default function(
	context : ContextInstanceType,
	dependencies : DependenciesType,
	/* add additional parameters here */
	src : string
) : ReturnType<ImplementationDocType> {

	return removeImplementation(context, dependencies, src)

}
