export function save(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {}
}

export function load(key, fallback = null) {
	try {
		const data = localStorage.getItem(key);
		if (data) return JSON.parse(data);
	} catch (e) {}
	return fallback;
}

export function remove(key) {
	try {
		localStorage.removeItem(key);
	} catch (e) {}
}
