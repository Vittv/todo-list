import { createFolderPage } from "../components/folder";
import { createSidebar } from "../components/sidebar";
import { load } from "../data/storage";

export function init(container) {
	container.innerHTML = "";

	createSidebar(container);

	const folderPage = document.createElement("div");
	folderPage.className = "folder-page";
	container.appendChild(folderPage);

	// Load last folder from storage, fallback to __today
	let lastFolderId = load("lastFolderId", "__today");
	const allFolders = require("../data/folderData").getFolders();
	const folderExists = allFolders.some(f => f.id === lastFolderId);
	if (!folderExists) {
		lastFolderId = "__today";
	}
	createFolderPage(folderPage, lastFolderId);

	// Set active sidebar button for last folder
	setTimeout(() => {
		const selector = `.sidebar-button[data-folder-id='${lastFolderId}'], .sidebar-button[data-folderid='${lastFolderId}']`;
		const btn = document.querySelector(selector);
		if (btn) {
			document.querySelectorAll('.sidebar-button').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
		}
	}, 0);
}
