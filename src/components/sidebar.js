import { renderSystemFolders } from "./sidebar/sidebarSystemFolders";
import { renderUserFolders } from "./sidebar/sidebarUserFolders";

export function createSidebar(container) {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	const sidebarTopMenu = document.createElement("div");
	sidebarTopMenu.className = "sidebar-top-menu";
	const sidebarBottomMenu = document.createElement("div");
	sidebarBottomMenu.className = "sidebar-bottom-menu";

	renderSystemFolders(sidebarTopMenu);
	renderUserFolders(sidebarBottomMenu);

	sidebar.appendChild(sidebarTopMenu);
	sidebar.appendChild(sidebarBottomMenu);
	container.appendChild(sidebar);
}