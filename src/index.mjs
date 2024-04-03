import fs from "@anio-fs/api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

function nodeFsRemove(src, dest) {
	return async_impl(fs.async, src, dest)
}

nodeFsRemove.sync = function(src, dest) {
	return sync_impl(fs.sync, src, dest)
}

export default nodeFsRemove
