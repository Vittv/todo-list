export default function createSidebar(sections) {
	const sidebar = document.createElement("aside");
	sidebar.classList.add("sidebar");

	function addSection(title, items) {
		// Wrapper for heading + add button
		const headerWrapper = document.createElement("div");
		headerWrapper.classList.add("sidebar-header");

		const heading = document.createElement("h2");
		heading.textContent = title;

		const addBtn = document.createElement("button");
		addBtn.textContent = "+";
		addBtn.classList.add("add-task-to-folder-btn");
		addBtn.setAttribute("data-folder", title);

		headerWrapper.appendChild(heading);
		headerWrapper.appendChild(addBtn);
		sidebar.appendChild(headerWrapper);

		// Section with task buttons
		const section = document.createElement("nav");
		section.classList.add("sidebar-section");

		items.forEach((item) => {
			const button = document.createElement("button");
			button.textContent = item;
			button.classList.add("sidebar-btn");
			button.setAttribute("data-view", item.toLowerCase().replace(/\s+/g, "-"));
			section.appendChild(button);
		});

		sidebar.appendChild(section);
	}

	sections.forEach(({ title, items }) => {
		addSection(title, items);
	});

	const addTaskBtn = document.createElement("button");
	addTaskBtn.textContent = "+ New Task";
	addTaskBtn.classList.add("add-task-btn");
	sidebar.appendChild(addTaskBtn);

	const addFolderBtn = document.createElement("button");
	addFolderBtn.textContent = "+ New Folder";
	addFolderBtn.classList.add("add-folder-btn");
	sidebar.appendChild(addFolderBtn);

	return sidebar;
}
