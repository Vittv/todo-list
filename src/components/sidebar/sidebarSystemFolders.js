import { getFolders } from "../../data/folderData";
import { createFolderPage } from "../folder";

export function renderSystemFolders(container) {
	const allFolders = getFolders();
	const systemFolders = allFolders.filter(f => typeof f.id === "string" && f.id.startsWith("__"));

	systemFolders.forEach(folder => {
		const button = document.createElement("button");
		button.textContent = folder.name;
		button.className = "sidebar-button";
		button.addEventListener("click", () => {
			const main = document.getElementById("content");
			if (main) {
				let folderPage = main.querySelector('.folder-page');
				if (!folderPage) {
					folderPage = document.createElement("div");
					folderPage.className = "folder-page";
					main.appendChild(folderPage);
				}
				createFolderPage(folderPage, folder.id);
			}
		});
		container.appendChild(button);
	});
}
