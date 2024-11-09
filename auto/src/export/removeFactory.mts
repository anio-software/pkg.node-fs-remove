import {
	getProjectPackageJSON,
	getFourtuneConfiguration
} from "@fourtune/realm-js/v0/project"

import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {useContext} from "@fourtune/realm-js/v0/runtime"

import type {DependenciesType} from "#~auto/DependenciesType.d.mts"

import implementation from "#~auto/implementation.mts"

/* needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationDocType.d.mts"

import {scandirFactory} from "@anio-fs/scandir"
import {getTypeOfPathFactory} from "@anio-fs/path-type"

/* ImplementationDocType is needed to make doctypes work in LSP */
export function removeFactory(user : UserContext = {}) : ImplementationDocType {
	const project = {
		package_json: getProjectPackageJSON(),
		fourtune_configuration: getFourtuneConfiguration()
	}

	const context = useContext(project, user)

	const dependencies : DependenciesType = {
		scandir: scandirFactory(user),
		getTypeOfPath: getTypeOfPathFactory(user),
	}

	return async function remove(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
		return await implementation(context, dependencies, ...args)
	}
}
