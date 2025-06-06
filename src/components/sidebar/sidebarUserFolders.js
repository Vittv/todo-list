import { getFolders } from "../../data/folderData";
import { createFolderPage } from "../folder";

const systemFolderIcons = {
	"__today": { icon: "fa-star", color: "#FFD600" },
	"__upcoming": { icon: "fa-calendar", color: "#FF8A80" },
	"__someday": { icon: "fa-box", color: "#A5D6A7" },
	"__misc": { icon: "fa-layer-group", color: "#607D8B" },
};

export function renderSystemFolders(container) {
	const allFolders = getFolders();
	const systemFolders = allFolders.filter(f => typeof f.id === "string" && f.id.startsWith("__"));

	systemFolders.forEach(folder => {
		const button = document.createElement("button");
		button.className = "sidebar-button";

		const iconInfo = systemFolderIcons[folder.id] || { icon: "fa-folder", color: "#888" };
		const icon = document.createElement("i");
		icon.className = `fas ${iconInfo.icon} fa-fw`;
		icon.style.color = iconInfo.color;
		icon.style.marginRight = "0.5em";

		button.appendChild(icon);
		button.append(folder.name);

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

			const allSidebarButtons = document.querySelectorAll('.sidebar-button');
			allSidebarButtons.forEach(btn => btn.classList.remove('active'));
			button.classList.add('active');
		});
		container.appendChild(button);
	});
}

import { createFolderPage as createUserFolderPage } from "../folder";

export function renderUserFolders(container) {
	const allFolders = getFolders();
	const userFolders = allFolders.filter(f => typeof f.id === "number");

	userFolders.forEach(folder => {
		const button = document.createElement("button");
		button.className = "sidebar-button";
		button.dataset.folderId = folder.id;

		const icon = document.createElement("i");
		icon.className = "fas fa-cube fa-fw";
		icon.style.color = "#999";
		icon.style.marginRight = "0.5em";

		button.appendChild(icon);
		button.append(folder.name);

		button.addEventListener("click", () => {
			const main = document.getElementById("content");
			if (main) {
				let folderPage = main.querySelector('.folder-page');
				if (!folderPage) {
					folderPage = document.createElement("div");
					folderPage.className = "folder-page";
					main.appendChild(folderPage);
				}
				createUserFolderPage(folderPage, folder.id);
			}

			const allSidebarButtons = document.querySelectorAll('.sidebar-button');
			allSidebarButtons.forEach(btn => btn.classList.remove('active'));
			button.classList.add('active');
		});
		container.appendChild(button);
	});
}
