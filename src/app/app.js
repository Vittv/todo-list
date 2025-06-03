import { renderSidebar } from "../controllers/sidebarController.js";
import renderTask from "../components/task.js";
import { sidebarData } from "../services/sidebarService.js";

export function init(container) {
	container.innerHTML = "";

	renderSidebar(container);

	const firstFolder = sidebarData[0];
	const firstTask = firstFolder?.items?.[0];

	if (firstTask) {
		const task = renderTask(firstTask);
		container.appendChild(task);
	}
}
