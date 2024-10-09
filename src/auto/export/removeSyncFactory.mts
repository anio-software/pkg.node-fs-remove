import {unlink, rmdir} from "@anio-fs/api/sync"

import {getTypeOfPathSyncFactory as getTypeOfPathFactory, PathType} from "@anio-fs/path-type"

import {scandirSyncFactory as scandirFactory} from "@anio-fs/scandir"

import type {FunctionTypeFromFactoryType, UsableContextType, ContextInstanceType} from "@fourtune/realm-js"
import {useContext} from "@fourtune/realm-js"

import {removeSync as fn} from "./removeSync.mts"

interface Dependencies {
	getTypeOfPath: FunctionTypeFromFactoryType<typeof getTypeOfPathFactory>
	scandir : FunctionTypeFromFactoryType<typeof scandirFactory>
}

function removeDirectory(src : string, dependencies : Dependencies) {
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
				removeDirectory(absolute_path, dependencies)
			} else {
				unlink(absolute_path)
			}
		},
		reverse: true
	})

	rmdir(src)
}

function removeImplementation(src : string, context : ContextInstanceType, dependencies : Dependencies) : void {
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
			removeDirectory(src, dependencies)

			return
		}
	}

	unlink(src)
}

export function removeSyncFactory(context_or_options : UsableContextType = {}) : typeof fn {
	const context = useContext(context_or_options)

	const dependencies : Dependencies = {
		getTypeOfPath: getTypeOfPathFactory(context_or_options),
		scandir: scandirFactory(context_or_options)
	}

	return function remove(src : string) : ReturnType<typeof fn> {
		return removeImplementation(src, context, dependencies)
	}
}
