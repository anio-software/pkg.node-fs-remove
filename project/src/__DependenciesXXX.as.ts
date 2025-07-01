import type {getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
//>import type {getTypeOfPathSync} from "@anio-software/pkg.node-fs-path-type"

import type {scandirCallback} from "@anio-software/pkg.node-fs-scandir"
//>import type {scandirSyncCallback} from "@anio-software/pkg.node-fs-scandir"

export type __EnkoreFunctionDependencies = {
	getTypeOfPath: typeof getTypeOfPath
//>	getTypeOfPath: typeof getTypeOfPathSync

	scandirCallback: typeof scandirCallback
//>	scandirCallback: typeof scandirSyncCallback
}
