import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function remove(path) {
	return async_impl(path)
}

export function removeSync(path) {
	return sync_impl(path)
}
