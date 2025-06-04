const folders = [
	{ id: 1, name: "Work" },
	{ id: 2, name: "Personal" },
];

export function getFolders() {
	return folders;
}

export function addFolder(name) {
	if (!name || typeof name !== "string") {
		throw new Error("Folder name must be a non-empty string");
	}

	const newId = folders.length > 0 ? Math.max(...folders.map(f => f.id)) + 1 : 1;

	const newFolder = {
		id: newId,
		name: name.trim(),
	};

	folders.push(newFolder);

	return newFolder;
}

export function deleteFolder(id) {
	const index = folders.findIndex(folder => folder.id === id);

	if (index !== -1) {
		folders.splice(index, 1);
		return true;
	}

	return false;
}