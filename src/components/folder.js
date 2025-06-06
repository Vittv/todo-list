import { getTasks } from "../data/taskData";
import { getFolders } from "../data/folderData";

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
		return;
	}

	tasks.forEach(task => {
		const taskDiv = document.createElement("div");
		taskDiv.className = "task-block";

		// Header
		const headerDiv = document.createElement("div");
		const title = document.createElement("h2");
		title.textContent = task.title;

		const description = document.createElement("h3");
		description.textContent = task.description;

		headerDiv.appendChild(title);
		headerDiv.appendChild(description);

		// Meta
		const metaDiv = document.createElement("div");
		const due = document.createElement("p");
		due.textContent = `Due: ${task.dueDate || "N/A"}`;

		const priority = document.createElement("p");
		priority.textContent = `Priority: ${task.priority}`;

		metaDiv.appendChild(due);
		metaDiv.appendChild(priority);

		// Details
		const detailDiv = document.createElement("div");

		if (task.notes) {
			const notes = document.createElement("p");
			notes.textContent = `Notes: ${task.notes}`;
			detailDiv.appendChild(notes);
		}

		const checklist = task.checklist || task.checkList || [];
		if (checklist.length > 0) {
			const ul = document.createElement("ul");

			checklist.forEach(item => {
				const li = document.createElement("li");

				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.checked = item.done;
				checkbox.disabled = true;

				li.appendChild(checkbox);
				li.append(` ${item.text}`);
				ul.appendChild(li);
			});

			detailDiv.appendChild(ul);
		}

		taskDiv.appendChild(headerDiv);
		taskDiv.appendChild(metaDiv);
		taskDiv.appendChild(detailDiv);

		folderPage.appendChild(taskDiv);
	});
}
