/* -------- required imports by template -------- */
import type {ContextInstanceType} from "@fourtune/realm-js"
import type {DependenciesType} from "#/auto/DependenciesType.d.mts"

import type {ImplementationDocType} from "#/auto/ImplementationDocType.d.mts"
/* -------- required imports by template -------- */

import {unlink, rmdir} from "@anio-fs/api/async"

import {PathType} from "@anio-fs/path-type"

async function removeDirectory(
	dependencies : DependenciesType,
	src : string
) {
	const {scandir} = dependencies

	await scandir(src, {
		async callback({type, absolute_path}) {
			if (
				type === PathType.linkToDir ||
				type === PathType.linkToFile ||
				type === PathType.brokenLink
				) {
				await unlink(absolute_path)
			} else if (type === PathType.regularDir) {
				await removeDirectory(dependencies, absolute_path)
			} else {
				await unlink(absolute_path)
			}
		},
		reverse: true
	})

	await rmdir(src)
}

async function removeImplementation(
	context : ContextInstanceType,
	dependencies : DependenciesType,
	src : string,
) : Promise<void> {
	context.log.debug(`removing "${src}"`)

	const path_type = await dependencies.getTypeOfPath(src)

	if (path_type === PathType.nonExisting) return

	switch (path_type) {
		case PathType.linkToDir:
		case PathType.linkToFile:
		case PathType.brokenLink: {
			await unlink(src)

			return
		}

		case PathType.regularDir: {
			await removeDirectory(dependencies, src)

			return
		}
	}

	await unlink(src)
}

export default async function(
	context : ContextInstanceType,
	dependencies : DependenciesType,
	/* add additional parameters here */
	src : string
) : ReturnType<ImplementationDocType> {

	return await removeImplementation(context, dependencies, src)

}
