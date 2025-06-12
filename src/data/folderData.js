import { save, load } from "./storage";
import { getTasks, setTasks } from "./taskData";

export const SYSTEM_FOLDERS = [
	{ id: "__today", name: "Today"},
	{ id: "__upcoming", name: "Upcoming"},
	{ id: "__someday", name: "Someday"},
	{ id: "__misc", name: "Misc" },
];

// Load userFolders from localStorage if available
const USER_FOLDERS_KEY = "userFolders";
const defaultUserFolders = [
	{ id: 1, name: "Work" },
	{ id: 2, name: "Personal" },
];

let userFolders = load(USER_FOLDERS_KEY, defaultUserFolders);
// Ensure all ids are numbers (fix for localStorage string issue)
userFolders = userFolders.map(f => ({ ...f, id: Number(f.id) }));
// Clean up userFolders: remove folders with invalid ids and fix NaN/0 ids
userFolders = userFolders.filter(f => Number.isInteger(f.id) && f.id > 0);

console.log("Current userFolders:", userFolders); // Debug log after loading

export function getFolders() {
	return [...SYSTEM_FOLDERS, ...userFolders];
}

export function addFolder(name) {
	// Only consider folders with valid numeric ids > 0
	const validIds = userFolders.map(f => Number(f.id)).filter(id => Number.isInteger(id) && id > 0);
	const newId = validIds.length > 0 ? Math.max(...validIds) + 1 : 1;

	const newFolder = {
		id: newId,
		name: name.trim(),
	};
	console.log("Adding new folder:", newFolder); // Debug log
	userFolders.push(newFolder);
	save(USER_FOLDERS_KEY, userFolders);
	console.log("Updated userFolders:", userFolders); // Debug log after adding
	return newFolder;
}

export function deleteFolder(id) {
	if (typeof id === "string" && id.startsWith("__")) return false;

	const index = userFolders.findIndex(folder => folder.id === id);
	if (index !== -1) {
		userFolders.splice(index, 1);
		save(USER_FOLDERS_KEY, userFolders);
		// Synchronously delete all tasks with this folderId (handle both string and number id types)
		const allTasks = getTasks();
		console.log("[deleteFolder] All tasks before filtering:", allTasks);
		const filteredTasks = allTasks.filter(task => String(task.folderId) !== String(id));
		const deletedTasks = allTasks.filter(task => String(task.folderId) === String(id));
		console.log(`[deleteFolder] Deleting folder id: ${id}`);
		console.log("[deleteFolder] Tasks to be deleted:", deletedTasks);
		console.log("[deleteFolder] Tasks after filtering:", filteredTasks);
		save("tasks", filteredTasks);
		setTasks(filteredTasks); // Update in-memory tasks array
		return true;
	}
	return false;
}

export function updateFolderName(id, newName) {
	const idx = userFolders.findIndex(f => f.id === id);
	if (idx !== -1) {
		userFolders[idx].name = newName;
		save(USER_FOLDERS_KEY, userFolders);
	}
}