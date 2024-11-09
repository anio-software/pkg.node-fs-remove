import {scandir} from "@anio-fs/scandir"
import {getTypeOfPath} from "@anio-fs/path-type"
export type DependenciesType = {
	scandir: typeof scandir,
	getTypeOfPath: typeof getTypeOfPath,
}
