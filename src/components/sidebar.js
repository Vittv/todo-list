import { renderSystemFolders } from "./sidebar/sidebarSystemFolders";
import { renderUserFolders } from "./sidebar/sidebarUserFolders";

export function createSidebar(container) {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	const sidebarTopBar = document.createElement("div");
	sidebarTopBar.className = "sidebar-top-bar";

	const githubButton = document.createElement("button");
	githubButton.className = "sidebar-topbar-btn github-btn";
	const githubIcon = document.createElement("i");
	githubIcon.className = "fab fa-github fa-fw";
	githubButton.appendChild(githubIcon);

	const moonButton = document.createElement("button");
	moonButton.className = "sidebar-topbar-btn moon-btn";
	const moonIcon = document.createElement("i");
	moonIcon.className = "fas fa-moon fa-fw";
	moonButton.appendChild(moonIcon);

	sidebarTopBar.appendChild(githubButton);
	sidebarTopBar.appendChild(moonButton);
	sidebar.appendChild(sidebarTopBar);

	const sidebarTopMenu = document.createElement("div");
	sidebarTopMenu.className = "sidebar-top-menu";
	const sidebarBottomMenu = document.createElement("div");
	sidebarBottomMenu.className = "sidebar-bottom-menu";

	renderSystemFolders(sidebarTopMenu);
	renderUserFolders(sidebarBottomMenu);

	sidebar.appendChild(sidebarTopMenu);
	sidebar.appendChild(sidebarBottomMenu);

	// Set the default active sidebar button for Today on initial load
	setTimeout(() => {
		const todayButton = sidebarTopMenu.querySelector('.sidebar-button');
		if (todayButton) todayButton.classList.add('active');
	}, 0);

	const sidebarBottomBar = document.createElement("div");
	sidebarBottomBar.className = "sidebar-bottom-bar";
	const addFolderButton = document.createElement("button");
	addFolderButton.className = "add-folder-button";
	addFolderButton.textContent = "+";
	addFolderButton.title = "Add folder";
	sidebarBottomBar.appendChild(addFolderButton);
	sidebar.appendChild(sidebarBottomBar);

	container.appendChild(sidebar);
}