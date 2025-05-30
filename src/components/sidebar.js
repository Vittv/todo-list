export default function createSidebar(sections) {
	const sidebar = document.createElement("aside");
	sidebar.classList.add("sidebar");

	function addSection(title, items, deletable) {
		// Wrapper for heading + actions
		const headerWrapper = document.createElement("div");
		headerWrapper.classList.add("sidebar-header");

		const heading = document.createElement("h2");
		heading.textContent = title;

		// Action buttons wrapper
		const actionsWrapper = document.createElement("div");
		actionsWrapper.classList.add("sidebar-header-actions");

		if (deletable) {
			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "×";
			deleteBtn.classList.add("delete-folder-btn");
			deleteBtn.title = "Delete Folder";

			deleteBtn.addEventListener("click", () => {
				console.log(`Delete folder: ${title}`);
			});

			actionsWrapper.appendChild(deleteBtn);
		}

		const addBtn = document.createElement("button");
		addBtn.textContent = "+";
		addBtn.classList.add("add-task-to-folder-btn");
		addBtn.setAttribute("data-folder", title);
		actionsWrapper.appendChild(addBtn);

		headerWrapper.appendChild(heading);
		headerWrapper.appendChild(actionsWrapper);
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

	sections.forEach(({ title, items, deletable }) => {
		addSection(title, items, deletable);
	});

	// Container for "New Task" and "New Folder" buttons
	const actionContainer = document.createElement("div");
	actionContainer.classList.add("sidebar-actions");

	const addTaskBtn = document.createElement("button");
	addTaskBtn.textContent = "+ New Task";
	addTaskBtn.classList.add("add-task-btn");

	const addFolderBtn = document.createElement("button");
	addFolderBtn.textContent = "+ New Folder";
	addFolderBtn.classList.add("add-folder-btn");

	actionContainer.appendChild(addTaskBtn);
	actionContainer.appendChild(addFolderBtn);
	sidebar.appendChild(actionContainer);

	return sidebar;
}
