/* -------- required imports by template -------- */
import type {ContextInstance} from "@fourtune/realm-js/v0/runtime"
import type {DependenciesType} from "#~auto/DependenciesType.d.mts"
//>import type {DependenciesType} from "#~auto/DependenciesSyncType.d.mts"

import type {ImplementationDocType} from "#~auto/ImplementationDocType.d.mts"
//>import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"
/* -------- required imports by template -------- */

import {unlink, rmdir} from "@anio-fs/api/async"
//>import {unlink, rmdir} from "@anio-fs/api/sync"

async function removeDirectory(
//>function removeDirectory(
	dependencies : DependenciesType,
	src : string
) {
	const {scandir} = dependencies

	await scandir(src, {
//>	scandir(src, {
		async callback({type, absolute_path}) {
//>		callback({type, absolute_path}) {
			if (
				type === "linkToDir" ||
				type === "linkToFile" ||
				type === "brokenLink"
				) {
				await unlink(absolute_path)
//>				unlink(absolute_path)
			} else if (type === "regularDir") {
				await removeDirectory(dependencies, absolute_path)
//>				removeDirectory(dependencies, absolute_path)
			} else {
				await unlink(absolute_path)
//>				unlink(absolute_path)
			}
		},
		reverse: true
	})

	await rmdir(src)
//>	rmdir(src)
}

async function removeImplementation(
//>function removeImplementation(
	context : ContextInstance,
	dependencies : DependenciesType,
	src : string,
) : Promise<void> {
//>) : void {
	context.log.debug(`removing "${src}"`)

	const path_type = await dependencies.getTypeOfPath(src)
//>	const path_type = dependencies.getTypeOfPath(src)

	if (path_type === "nonExisting") return

	switch (path_type) {
		case "linkToDir":
		case "linkToFile":
		case "brokenLink": {
			await unlink(src)
//>			unlink(src)

			return
		}

		case "regularDir": {
			await removeDirectory(dependencies, src)
//>			removeDirectory(dependencies, src)

			return
		}
	}

	await unlink(src)
//>	unlink(src)
}

export default async function(
//>export default function(
	context : ContextInstance,
	dependencies : DependenciesType,
	/* add additional parameters here */
	src: string
) : ReturnType<ImplementationDocType> {

	return await removeImplementation(context, dependencies, src)
//>	return removeImplementation(context, dependencies, src)

}
