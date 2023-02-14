export function deepEqual (a: any, b: any): boolean {
	if (a === b) return true

	if (
		a instanceof Date &&
		b instanceof Date &&
		a.getTime() !== b.getTime()
	) {
		return false
	}

	if (a !== Object(a) || b !== Object(b)) {
		return false
	}

	const props = Object.keys(a)

	if (props.length !== Object.keys(b).length) {
		return false
	}

	return props.every(p => deepEqual(a[p], b[p]))
}
