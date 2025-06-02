import { renderSidebar } from "../controllers/sidebarController.js";
import renderTask from "../components/task.js";

export function init(container) {
	container.innerHTML = "";

	renderSidebar(container);

	const task = renderTask("getTask");
	container.appendChild(task);
}
