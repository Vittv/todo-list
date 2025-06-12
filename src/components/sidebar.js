import { renderSystemFolders } from "./sidebar/sidebarSystemFolders";
import { renderUserFolders } from "./sidebar/sidebarUserFolders";
import { showFolderModal } from "./modal/folderModal";
import { addFolder } from "../data/folderData";

export function createSidebar(container) {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	const sidebarTopBar = document.createElement("div");
	sidebarTopBar.className = "sidebar-top-bar";

	const githubButton = document.createElement("button");
	githubButton.className = "sidebar-topbar-btn github-btn";
	const githubIcon = document.createElement("i");
	githubIcon.className = "fab fa-github fa-fw";
	githubButton.appendChild(githubIcon);
	githubButton.title = "Source code";
	githubButton.addEventListener("click", () => {
		window.open("https://github.com/Vittv/todo-list", "_blank", "noopener, noreferrer");
	})

	const moonButton = document.createElement("button");
	moonButton.className = "sidebar-topbar-btn moon-btn";
	const moonIcon = document.createElement("i");
	moonIcon.className = "fas fa-moon fa-fw";
	moonButton.appendChild(moonIcon);

	// Theme switching logic
	moonButton.title = "Switch theme";
	moonButton.addEventListener("click", () => {
		const root = document.documentElement;
		const current = root.getAttribute("data-theme") || "dark";
		const next = current === "dark" ? "light" : "dark";
		// Disable transitions during theme switch
		root.classList.add('disable-transitions');
		root.setAttribute("data-theme", next);
		try { localStorage.setItem("theme", next); } catch (e) {}
		moonIcon.className = next === "dark" ? "fas fa-moon fa-fw" : "fas fa-sun fa-fw";
		setTimeout(() => {
			root.classList.remove('disable-transitions');
		}, 350); // match or slightly exceed your transition duration
	});

	// On load, set icon and theme from localStorage if available, otherwise use OS preference, otherwise default to light
	try {
		let theme = localStorage.getItem("theme");
		if (theme !== "light" && theme !== "dark") {
			// Check OS preference
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				theme = "dark";
			} else {
				theme = "light";
			}
		}
		document.documentElement.setAttribute("data-theme", theme);
		moonIcon.className = theme === "dark" ? "fas fa-moon fa-fw" : "fas fa-sun fa-fw";
	} catch (e) {}

	sidebarTopBar.appendChild(githubButton);
	sidebarTopBar.appendChild(moonButton);
	sidebar.appendChild(sidebarTopBar);

	const sidebarTopMenu = document.createElement("div");
	sidebarTopMenu.className = "sidebar-top-menu";
	const sidebarBottomMenu = document.createElement("div");
	sidebarBottomMenu.className = "sidebar-bottom-menu";

	renderSystemFolders(sidebarTopMenu);
	renderUserFolders(sidebarBottomMenu);

	sidebar.appendChild(sidebarTopMenu);
	sidebar.appendChild(sidebarBottomMenu);

	// Set the default active sidebar button for Today on initial load
	setTimeout(() => {
		const todayButton = sidebarTopMenu.querySelector('.sidebar-button');
		if (todayButton) todayButton.classList.add('active');
	}, 0);

	const sidebarBottomBar = document.createElement("div");
	sidebarBottomBar.className = "sidebar-bottom-bar";
	const addFolderButton = document.createElement("button");
	addFolderButton.className = "add-folder-button";
	addFolderButton.textContent = "+";
	addFolderButton.title = "Add folder";

	addFolderButton.addEventListener("click", () => {
		showFolderModal({
			onSubmit: (name) => {
				addFolder(name);
				// Re-render sidebar user folders
				const sidebarBottomMenu = sidebar.querySelector('.sidebar-bottom-menu');
				if (sidebarBottomMenu) {
					sidebarBottomMenu.innerHTML = "";
					renderUserFolders(sidebarBottomMenu);
				}
			}
		});
	});

	sidebarBottomBar.appendChild(addFolderButton);
	sidebar.appendChild(sidebarBottomBar);

	container.appendChild(sidebar);

	// When clicking outside sidebar on mobile, close it
	document.addEventListener("click", function(e) {
		if (window.innerWidth > 700) return;
		if (!sidebar.classList.contains("open")) return;
		if (!sidebar.contains(e.target)) {
			sidebar.classList.remove("open");
		}
	});

	let startX = null;
	let currentX = null;
	let startY = null;
	let currentY = null;
	let touching = false;

	// Touch start
	window.addEventListener("touchstart", function(e) {
		if (window.innerWidth > 700) return;
		if (e.touches.length !== 1) return;
		startX = e.touches[0].clientX;
		currentX = startX;
		startY = e.touches[0].clientY;
		currentY = startY;
		touching = true;
	}, { passive: true });

	// Touch move
	window.addEventListener("touchmove", function(e) {
		if (!touching || window.innerWidth > 700) return;
		currentX = e.touches[0].clientX;
		currentY = e.touches[0].clientY;
	}, { passive: true });

	// Touch end
	window.addEventListener("touchend", function(e) {
		if (!touching || window.innerWidth > 700) return;
		const dx = currentX - startX;
		const dy = currentY - startY;
		// Only trigger if horizontal swipe is dominant and vertical movement is not too large
		if (!sidebar.classList.contains("open") && dx > 40 && Math.abs(dy) < 30) {
			sidebar.classList.add("open"); // swipe right to open
		}
		if (sidebar.classList.contains("open") && dx < -40 && Math.abs(dy) < 30) {
			sidebar.classList.remove("open"); // swipe left to close
		}
		touching = false;
		startX = null;
		currentX = null;
		startY = null;
		currentY = null;
	}, { passive: true });

	// Hide sidebar on mobile when a sidebar button is clicked
	const hideSidebarOnMobile = () => {
		if (window.innerWidth <= 700) {
			sidebar.classList.remove("open");
		}
	};
	
	sidebar.addEventListener("click", function(e) {
		const btn = e.target.closest(".sidebar-button");
		if (btn) {
			btn.classList.add("active");
			setTimeout(() => {
				hideSidebarOnMobile();
			}, 120); // 120ms delay for feedback
		}
	});

	// Blur content when sidebar is open on mobile
	function updateSidebarBlur() {
		const content = document.getElementById("content");
		if (!content) return;
		if (window.innerWidth > 700) {
			content.classList.remove("sidebar-blur");
			return;
		}
		if (sidebar.classList.contains("open")) {
			content.classList.add("sidebar-blur");
		} else {
			content.classList.remove("sidebar-blur");
		}
	}

	// Update blur on sidebar open/close
	sidebar.addEventListener("transitionend", updateSidebarBlur);
	// Also update on swipe and toggle
	const observer = new MutationObserver(updateSidebarBlur);
	observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
	window.addEventListener("resize", updateSidebarBlur);

	// Initial state
	updateSidebarBlur();
}