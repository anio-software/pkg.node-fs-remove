import {scandirSync} from "@anio-fs/scandir"
import {getTypeOfPathSync} from "@anio-fs/path-type"
export type DependenciesType = {
	scandir: typeof scandirSync,
	getTypeOfPath: typeof getTypeOfPathSync,
}
