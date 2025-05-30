import createSidebar from "../components/sidebar.js";
import { sidebarData } from "../services/sidebarService.js";

export function init(container) {
    container.innerHTML = "";
    const sidebar = createSidebar(sidebarData);
    container.appendChild(sidebar);
}