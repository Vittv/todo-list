export const SYSTEM_FOLDERS = [
	{ id: "__today", name: "Today"},
	{ id: "__upcoming", name: "Upcoming"},
	{ id: "__someday", name: "Someday"},
	{ id: "__misc", name: "Misc" },
];

const userFolders = [
	{ id: 1, name: "Work" },
	{ id: 2, name: "Personal" },
];

function saveFoldersToStorage() {
  try {
    localStorage.setItem('userFolders', JSON.stringify(userFolders));
  } catch (e) {}
}

function loadFoldersFromStorage() {
  try {
    const data = localStorage.getItem('userFolders');
    if (data) {
      const arr = JSON.parse(data);
      if (Array.isArray(arr)) {
        userFolders.length = 0;
        arr.forEach(f => userFolders.push(f));
      }
    }
  } catch (e) {}
}

loadFoldersFromStorage();

export function getFolders() {
	return [...SYSTEM_FOLDERS, ...userFolders];
}

export function addFolder(name) {
	const newId = userFolders.length > 0 ? Math.max(...userFolders.map(f => f.id)) + 1 : 1;

	const newFolder = {
		id: newId,
		name: name.trim(),
	};
	userFolders.push(newFolder);
	saveFoldersToStorage();
	return newFolder;
}

export function deleteFolder(id) {
	if (typeof id === "string" && id.startsWith("__")) return false;

	const index = userFolders.findIndex(folder => folder.id === id);
	if (index !== -1) {
		userFolders.splice(index, 1);
		saveFoldersToStorage();
		return true;
	}
	return false;
}