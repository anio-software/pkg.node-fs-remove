import createFSObject from "@anio-node-foundation/fs-api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

const async_fs = createFSObject({sync: false})
const sync_fs = createFSObject({sync: true})

function nodeFsRemove(src, dest) {
	return async_impl(async_fs, src, dest)
}

nodeFsRemove.sync = function(src, dest) {
	return sync_impl(sync_fs, src, dest)
}

export default nodeFsRemove
