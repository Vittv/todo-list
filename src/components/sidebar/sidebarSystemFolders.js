import { getFolders } from "../../data/folderData";
import { createFolderPage } from "../folder";
import "../../styles/main.css";

const systemFolderIcons = {
	"__today": { icon: "fa-star", color: "var(--color-fg-system-today)", prefix: "fas" },
	"__upcoming": { icon: "fa-calendar", color: "var(--color-fg-system-upcoming)", prefix: "fas" },
	"__someday": { icon: "fa-box", color: "var(--color-fg-system-someday)", prefix: "fas" },
	"__misc": { icon: "fa-layer-group", color: "var(--color-fg-system-misc)", prefix: "fas" },
};

export function renderSystemFolders(container) {
	const allFolders = getFolders();
	const systemFolders = allFolders.filter(f => typeof f.id === "string" && f.id.startsWith("__"));

	systemFolders.forEach(folder => {
		const button = document.createElement("button");
		button.className = "sidebar-button";
		button.dataset.folderId = folder.id;

		const iconInfo = systemFolderIcons[folder.id] || { icon: "fa-folder", color: "#888", prefix: "fas" };
		const icon = document.createElement("i");
		icon.className = `${iconInfo.prefix} ${iconInfo.icon} fa-fw`;
		icon.style.color = iconInfo.color;
		icon.style.marginRight = "0.5em";

		button.appendChild(icon);
		const nameSpan = document.createElement("span");
		nameSpan.textContent = folder.name;
		button.appendChild(nameSpan);

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
