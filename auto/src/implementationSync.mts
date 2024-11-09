/* -------- required imports by template -------- */
import type {ContextInstance} from "@fourtune/realm-js/v0/runtime"
import type {DependenciesType} from "#~auto/DependenciesSyncType.d.mts"

import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"
/* -------- required imports by template -------- */

import {unlink, rmdir} from "@anio-fs/api/sync"

function removeDirectory(
	dependencies : DependenciesType,
	src : string
) {
	const {scandir} = dependencies

	scandir(src, {
		callback({type, absolute_path}) {
			if (
				type === "linkToDir" ||
				type === "linkToFile" ||
				type === "brokenLink"
				) {
				unlink(absolute_path)
			} else if (type === "regularDir") {
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
	context : ContextInstance,
	dependencies : DependenciesType,
	src : string,
) : void {
	context.log.debug(`removing "${src}"`)

	const path_type = dependencies.getTypeOfPath(src)

	if (path_type === "nonExisting") return

	switch (path_type) {
		case "linkToDir":
		case "linkToFile":
		case "brokenLink": {
			unlink(src)

			return
		}

		case "regularDir": {
			removeDirectory(dependencies, src)

			return
		}
	}

	unlink(src)
}

export default function(
	context : ContextInstance,
	dependencies : DependenciesType,
	/* add additional parameters here */
	src: string
) : ReturnType<ImplementationDocType> {

	return removeImplementation(context, dependencies, src)

}
