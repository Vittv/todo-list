import { createFolderPage } from "../components/folder";
import { createSidebar } from "../components/sidebar";

export function init(container) {
	container.innerHTML = "";

	createSidebar(container);

	const folderPage = document.createElement("div");
	folderPage.className = "folder-page";
	container.appendChild(folderPage);
	createFolderPage(folderPage, "__today");
}
