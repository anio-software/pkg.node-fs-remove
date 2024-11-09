import {
	getProjectPackageJSON,
	getFourtuneConfiguration
} from "@fourtune/realm-js/v0/project"

import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {useContext} from "@fourtune/realm-js/v0/runtime"

import type {DependenciesType} from "#~auto/DependenciesSyncType.d.mts"

import implementation from "#~auto/implementationSync.mts"

/* needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"

import {scandirSyncFactory} from "@anio-fs/scandir"
import {getTypeOfPathSyncFactory} from "@anio-fs/path-type"

/* ImplementationDocType is needed to make doctypes work in LSP */
export function removeSyncFactory(user : UserContext = {}) : ImplementationDocType {
	const project = {
		package_json: getProjectPackageJSON(),
		fourtune_configuration: getFourtuneConfiguration()
	}

	const context = useContext(project, user)

	const dependencies : DependenciesType = {
		scandir: scandirSyncFactory(user),
		getTypeOfPath: getTypeOfPathSyncFactory(user),
	}

	return function removeSync(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
		return implementation(context, dependencies, ...args)
	}
}
