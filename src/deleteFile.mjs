import fs from "node:fs"

export default function(path) {
	fs.unlinkSync(path)
}
