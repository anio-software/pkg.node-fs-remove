import {unlink, rmdir} from "@anio-fs/api/async"

import {getTypeOfPathFactory, PathType} from "@anio-fs/path-type"

import {scandirFactory} from "@anio-fs/scandir"

import type {FunctionTypeFromFactoryType, UsableContextType, ContextInstanceType} from "@fourtune/realm-js"
import {useContext} from "@fourtune/realm-js"

import fn from "./remove.mts"

interface Dependencies {
	getTypeOfPath: FunctionTypeFromFactoryType<typeof getTypeOfPathFactory>
	scandir : FunctionTypeFromFactoryType<typeof scandirFactory>
}

async function removeDirectory(src : string, dependencies : Dependencies) {
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
				await removeDirectory(absolute_path, dependencies)
			} else {
				await unlink(absolute_path)
			}
		},
		reverse: true
	})

	await rmdir(src)
}

async function removeImplementation(src : string, context : ContextInstanceType, dependencies : Dependencies) : Promise<void> {
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
			await removeDirectory(src, dependencies)

			return
		}
	}

	await unlink(src)
}

export default function(context_or_options : UsableContextType = {}) : typeof fn {
	const context = useContext(context_or_options)

	const dependencies : Dependencies = {
		getTypeOfPath: getTypeOfPathFactory(context_or_options),
		scandir: scandirFactory(context_or_options)
	}

	return async function remove(src : string) : ReturnType<typeof fn> {
		return await removeImplementation(src, context, dependencies)
	}
}
