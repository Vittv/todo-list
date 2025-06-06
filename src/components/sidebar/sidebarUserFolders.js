import { getFolders } from "../../data/folderData";
import { createFolderPage } from "../folder";

export function renderUserFolders(container) {
	const allFolders = getFolders();
	const userFolders = allFolders.filter(f => typeof f.id === "number");

	userFolders.forEach(folder => {
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
