import { createSidebar } from "../components/sidebar";

export function init(container) {
	container.innerHTML = "";
	createSidebar(container);
}
