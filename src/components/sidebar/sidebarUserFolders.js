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
				const defaultPage = main.querySelector('.folder-page');
				if (defaultPage) defaultPage.remove();
				let area = main.querySelector(".task-area");
				if (!area) {
					area = document.createElement("div");
					area.className = "task-area";
					main.appendChild(area);
				}
				createFolderPage(area, folder.id);
			}
		});
		container.appendChild(button);
	});
}
