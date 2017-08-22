export function upsert(object, propertyPath, value) {
	var spread = propertyPath.startsWith('...');
	if (spread && typeof value !== 'object') throw new Error("Spread operator '...', can only be used with objects");

	function rec(objectTail, propertyPathTail, spread) {
    var propPaths = propertyPathTail.split('.');
    var head = propPaths[0];
    var tail = propPaths.splice(1);
		tail = tail.join('.');

		if (typeof objectTail[head] !== 'object') {
			objectTail[head] = {};
		}

		if (tail) {
			objectTail[head] = rec(objectTail[head], tail, spread);
			return objectTail;
		} else {
			if (!head) {
				return value;
			} else {
				objectTail[head] = spread ? Object.assign({}, objectTail[head], value) : value;
				return objectTail;
			}
		}
	}

	return rec(object, spread ? propertyPath.slice(3) : propertyPath, spread);
}
