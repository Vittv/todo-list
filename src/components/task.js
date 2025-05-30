import { getTask } from "../services/taskService";

export default function renderTask(name) {
	const task = getTask(name);
	if (!task) {
		const notFound = document.createElement("p");
		notFound.textContent = "Task not found.";
		return notFound;
	}

	const container = document.createElement("div");
	container.classList.add("task-view");

	const title = document.createElement("h1");
	title.textContent = name;

	const description = document.createElement("p");
	description.textContent = task.description;

	const subtaskList = document.createElement("ul");
	task.subtasks.forEach((subtask) => {
		const li = document.createElement("li");
		li.textContent = subtask;
		subtaskList.appendChild(li);
	});

	container.appendChild(title);
	container.appendChild(description);
	container.appendChild(subtaskList);

	return container;
}