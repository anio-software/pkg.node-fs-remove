import fs from "@anio-fs/api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function remove(path) {
	return async_impl(fs.async, path)
}

export function removeSync(path) {
	return sync_impl(fs.sync, path)
}
