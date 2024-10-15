export default {
	realm: "js",
	type: "async-sync",

	target: {
		function_name: "remove",

		dependencies: {
			"@anio-fs/scandir": "scandir",
			"@anio-fs/path-type": "getTypeOfPath"
		}
	}
}
