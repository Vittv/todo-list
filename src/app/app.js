import createSidebar from "../components/sidebar.js";
import { sidebarData } from "../services/sidebarService.js";
import renderTask from "../components/task.js";

export function init(container) {
    container.innerHTML = "";
    const sidebar = createSidebar(sidebarData);
    const task = renderTask("Tidy Bedroom");
    container.appendChild(sidebar);
    container.appendChild(task);
}