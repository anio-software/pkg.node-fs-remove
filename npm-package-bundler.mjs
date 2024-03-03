export default {
	preprocessing: [{
		file: "./src/template.mjs",
		items: {
			"async function removeSymbolicLink(": "function removeSymbolicLink(",
			"await fs_object.unlink(src)": "fs_object.unlink(src)",
			"async function removeFile(": "function removeFile(",
			"async function removeDirectory(": "function removeDirectory(",
			"await nodeFsScandir(": "nodeFsScandir.sync(",
			"async callback({type, relative_path, absolute_path}) {": "callback({type, relative_path, absolute_path}) {",
			"await removeSymbolicLink(": "removeSymbolicLink(",
			"await removeDirectory(": "removeDirectory(",
			"await removeFile(": "removeFile(",
			"await fs_object.rmdir": "fs_object.rmdir",
			"export default async function": "export default function",
			"await nodeFsGetPathType(src)": "nodeFsGetPathType.sync(src)",
			"await remove_fn": "remove_fn"
		},
		output: "./src/auto/sync.mjs"
	}, {
		file: "./src/template.mjs",
		items: {},
		output: "./src/auto/async.mjs"
	}]
}
