export function createSidebar(container) {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	const sidebarTopMenu = document.createElement("div");
	sidebarTopMenu.className = "sidebar-top-menu";

	const buttons = ["Today", "Upcoming", "Someday", "Misc"];

	buttons.forEach(name => {
		const button = document.createElement("button");
		button.className = "sidebar-button";
		button.textContent = name;

		sidebarTopMenu.appendChild(button);
	});

	const sidebarBottomMenu = document.createElement("div");
	sidebarBottomMenu.className = "sidebar-bottom-menu";

	sidebar.appendChild(sidebarTopMenu);
	sidebar.appendChild(sidebarBottomMenu)
	container.appendChild(sidebar);
}