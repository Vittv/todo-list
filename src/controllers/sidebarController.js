import createSidebar from "../components/sidebar.js";
import { addTaskToFolder, sidebarData } from "../services/sidebarService.js";
import createModal from "../components/modal.js";
import createFolderModal from "../components/folderModal.js";
import createConfirmModal from "../components/confirmModal.js";

function setupAddTaskListeners(container) {
	const addButtons = container.querySelectorAll(".add-task-to-folder-btn");
	const folderNames = sidebarData.map(folder => folder.title);

	addButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const folderName = btn.getAttribute("data-folder");

			createModal(folderName, ({ taskName, description, folder }) => {
				addTaskToFolder(folder, taskName);
				renderSidebar(container);
			}, folderNames);
		});
	});

	// Bottom "+ New Task" button
	const addTaskBtn = container.querySelector(".add-task-btn");
	if (addTaskBtn) {
		addTaskBtn.addEventListener("click", () => {
			createModal(null, ({ taskName, description, folder }) => {
				addTaskToFolder(folder, taskName);
				renderSidebar(container);
			}, folderNames);
		});
	}
}

function setupDeleteFolderListeners(container) {
	const deleteButtons = container.querySelectorAll(".delete-folder-btn");

	deleteButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const folderToDelete = btn.getAttribute("data-folder");

			createConfirmModal(
				`Delete ${folderToDelete} folder?`,
				() => {
					const index = sidebarData.findIndex(f => f.title === folderToDelete);
					if (index !== -1 && sidebarData[index].deletable) {
						sidebarData.splice(index, 1);
						renderSidebar(container);
					}
				},
				() => {
					console.log("Deletion cancelled.");
				}
			);
		});
	});
}

function setupNewFolderListener(container) {
	const newFolderBtn = container.querySelector(".add-folder-btn");
	if (!newFolderBtn) return;

	newFolderBtn.addEventListener("click", () => {
		createFolderModal((folderName) => {
			// Prevent duplicates
			if (sidebarData.some(folder => folder.title === folderName)) {
				alert("Folder already exists.");
				return;
			}

			sidebarData.push({ title: folderName, items: [], deletable: true });
			renderSidebar(container);
		});
	});
}

export function renderSidebar(container) {
	container.querySelector("aside.sidebar")?.remove(); // Remove old sidebar
	const sidebar = createSidebar(sidebarData);
	container.prepend(sidebar);

	setupAddTaskListeners(container);
	setupDeleteFolderListeners(container);
	setupNewFolderListener(container);
}
