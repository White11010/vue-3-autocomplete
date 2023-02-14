export function getObjectValue(object: any, path: string): string {
	console.log(object)
	console.log(path)
	try {
		const pathSplit = path.split('.')
		for (let i = 0; i < pathSplit.length; i++) {
			object = object[pathSplit[i]]
		}
		return object
	} catch (e) {
		throw `Cannot get property ${path} from ${object}`
	}
}
