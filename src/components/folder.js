import { getTasks } from "../data/taskData";
import { getFolders } from "../data/folderData";
import { showFolderModal } from "./modal/folderModal";
import { addFolder } from "../data/folderData";

export function createFolderPage(folderPage, folderId) {
	folderPage.innerHTML = ""; // clear any old content

	const allFolders = getFolders();
	const folder = allFolders.find(f => f.id === folderId);
	if (folder) {
		const heading = document.createElement("h1");
		heading.textContent = folder.name;
		folderPage.appendChild(heading);
	}

	const tasks = getTasks(folderId);
	if (!tasks || tasks.length === 0) {
		const emptyMsg = document.createElement("div");
		emptyMsg.className = "empty-tasks-message";
		emptyMsg.textContent = "It seems we have no tasks here yet.";
		folderPage.appendChild(emptyMsg);
	} else {
		tasks.forEach(task => {
			const taskDiv = document.createElement("div");
			taskDiv.className = "task-block";

			// Header
			const headerDiv = document.createElement("div");
			headerDiv.className = "headerdiv";
			headerDiv.style.display = "flex";
			headerDiv.style.alignItems = "center";
			headerDiv.style.justifyContent = "space-between";

			const title = document.createElement("h2");
			title.textContent = task.title;

			const actionsDiv = document.createElement("div");
			actionsDiv.style.display = "flex";
			actionsDiv.style.alignItems = "center";
			actionsDiv.style.gap = "0.5rem";

			const editTaskButton = document.createElement("button");
			editTaskButton.className = "edit-task-button";
			const editIcon = document.createElement("i");
			editIcon.className = "fas fa-pen";
			editTaskButton.appendChild(editIcon);
			editTaskButton.title = "Edit task";
			editTaskButton.style.background = "none";
			editTaskButton.style.border = "none";
			editTaskButton.style.color = "#ddd";
			editTaskButton.style.cursor = "pointer";
			editTaskButton.style.fontSize = "1.2rem";
			editTaskButton.style.display = "flex";
			editTaskButton.style.alignItems = "center";

			const deleteTaskButton = document.createElement("button");
			deleteTaskButton.className = "delete-task-button";
			const trashIcon = document.createElement("i");
			trashIcon.className = "fas fa-trash-alt";
			deleteTaskButton.appendChild(trashIcon);
			deleteTaskButton.title = "Delete task";
			deleteTaskButton.style.background = "none";
			deleteTaskButton.style.border = "none";
			deleteTaskButton.style.color = "#ff8a80";
			deleteTaskButton.style.cursor = "pointer";
			deleteTaskButton.style.fontSize = "1.2rem";
			deleteTaskButton.style.display = "flex";
			deleteTaskButton.style.alignItems = "center";

			actionsDiv.appendChild(editTaskButton);
			actionsDiv.appendChild(deleteTaskButton);

			headerDiv.appendChild(title);
			headerDiv.appendChild(actionsDiv);

			deleteTaskButton.addEventListener("click", () => {
				// Remove the task from the data and re-render the page
				import("../data/taskData").then(({ deleteTask }) => {
					deleteTask(task.id);
					createFolderPage(folderPage, folderId);
				});
			});

			const description = document.createElement("h3");
			description.textContent = task.description;

			// Meta
			const metaDiv = document.createElement("div");
			metaDiv.className = "metadiv";
			const due = document.createElement("p");
			due.textContent = `Due: ${task.dueDate || "N/A"}`;

			const priority = document.createElement("p");
			priority.textContent = `Priority: ${task.priority}`;

			metaDiv.appendChild(due);
			metaDiv.appendChild(priority);

			// Details
			const detailDiv = document.createElement("div");
			detailDiv.className = "detaildiv";

			if (task.notes) {
				const notes = document.createElement("p");
				notes.textContent = `Notes: ${task.notes}`;
				detailDiv.appendChild(notes);
			}

			const checklist = task.checklist || task.checkList || [];
			if (checklist.length > 0) {
				const ul = document.createElement("ul");

				checklist.forEach((item, idx) => {
					const li = document.createElement("li");

					const label = document.createElement("label");
					label.className = "custom-checkbox";

					const checkbox = document.createElement("input");
					checkbox.type = "checkbox";
					checkbox.checked = item.done;
					checkbox.addEventListener("change", (e) => {
						item.done = checkbox.checked;
					});

					const checkmark = document.createElement("span");
					checkmark.className = "checkmark";

					label.appendChild(checkbox);
					label.appendChild(checkmark);
					label.append(` ${item.text}`);

					li.appendChild(label);
					ul.appendChild(li);
				});

				detailDiv.appendChild(ul);
			}

			taskDiv.appendChild(headerDiv);
			taskDiv.appendChild(description);
			taskDiv.appendChild(metaDiv);
			taskDiv.appendChild(detailDiv);

			folderPage.appendChild(taskDiv);
		});
	}

	// Persistent bottom bar
	const bottomBar = document.createElement("div");
	bottomBar.className = "folder-bottom-bar";

	const addButton = document.createElement("button");
	addButton.className = "add-task-button";
	addButton.textContent = "+";
	addButton.title = "Add task";

	let deleteButton = null;
	let editFolderButton = null;

	// Only show delete/edit for user folders
	if (folder && typeof folder.id === "number") {
		deleteButton = document.createElement("button");
		deleteButton.className = "delete-folder-button";
		deleteButton.textContent = "-";
		deleteButton.title = "Delete folder";

		editFolderButton = document.createElement("button");
		editFolderButton.className = "edit-folder-button";
		const pencilIcon = document.createElement("i");
		pencilIcon.className = "fas fa-pen-to-square";
		editFolderButton.appendChild(pencilIcon);
		editFolderButton.title = "Edit Folder";

		// Edit folder logic
		editFolderButton.addEventListener("click", () => {
			showFolderModal({
				initialName: folder.name,
				onSubmit: (newName) => {
					if (newName && newName !== folder.name) {
						folder.name = newName;
						// Update sidebar user folders
						const sidebarBottomMenu = document.querySelector('.sidebar-bottom-menu');
						if (sidebarBottomMenu) {
							sidebarBottomMenu.innerHTML = "";
							import("./sidebar/sidebarUserFolders").then(({ renderUserFolders }) => {
								renderUserFolders(sidebarBottomMenu);
							});
						}
						// Update folder page heading
						const heading = folderPage.querySelector("h1");
						if (heading) heading.textContent = newName;
					}
				}
			});
		});
	}

	bottomBar.appendChild(addButton);
	if (deleteButton) bottomBar.appendChild(deleteButton);
	if (editFolderButton) bottomBar.appendChild(editFolderButton);

	folderPage.appendChild(bottomBar);
}
