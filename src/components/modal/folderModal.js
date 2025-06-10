export function showFolderModal({ onSubmit, initialName = "" } = {}) {
	// Remove any existing modal
	const existing = document.getElementById("folder-modal");
	if (existing) existing.remove();

	// Modal overlay
	const overlay = document.createElement("div");
	overlay.id = "folder-modal";
	overlay.style.position = "fixed";
	overlay.style.top = 0;
	overlay.style.left = 0;
	overlay.style.width = "100vw";
	overlay.style.height = "100vh";
	overlay.style.background = "rgba(0,0,0,0.5)";
	overlay.style.display = "flex";
	overlay.style.alignItems = "center";
	overlay.style.justifyContent = "center";
	overlay.style.zIndex = 1000;

	// Modal box
	const modal = document.createElement("div");
	modal.style.background = "#222";
	modal.style.padding = "2rem";
	modal.style.borderRadius = "10px";
	modal.style.boxShadow = "0 2px 16px #0008";
	modal.style.display = "flex";
	modal.style.flexDirection = "column";
	modal.style.gap = "1rem";
	modal.style.minWidth = "300px";

	const title = document.createElement("h2");
	title.textContent = initialName ? "Edit Folder" : "Add Folder";
	title.style.textAlign = "center";
	modal.appendChild(title);

	const input = document.createElement("input");
	input.type = "text";
	input.value = initialName;
	input.placeholder = "Folder name";
	input.style.fontSize = "1.2rem";
	input.style.padding = "0.5rem";
	input.style.borderRadius = "5px";
	input.style.border = "1px solid #444";
	input.style.background = "#111";
	input.style.color = "#fff";
	modal.appendChild(input);

	const error = document.createElement("div");
	error.style.color = "#ff8a80";
	error.style.fontSize = "1rem";
	error.style.height = "1.2em";
	modal.appendChild(error);

	const btnRow = document.createElement("div");
	btnRow.style.display = "flex";
	btnRow.style.gap = "1rem";
	btnRow.style.justifyContent = "center";

	const cancelBtn = document.createElement("button");
	cancelBtn.textContent = "Cancel";
	cancelBtn.style.background = "#444";
	cancelBtn.style.color = "#fff";
	cancelBtn.style.border = "none";
	cancelBtn.style.padding = "0.5rem 1.5rem";
	cancelBtn.style.borderRadius = "5px";
	cancelBtn.style.cursor = "pointer";
	cancelBtn.addEventListener("click", () => overlay.remove());

	const submitBtn = document.createElement("button");
	submitBtn.textContent = initialName ? "Save" : "Add";
	submitBtn.style.background = "#1b6fc4";
	submitBtn.style.color = "#fff";
	submitBtn.style.border = "none";
	submitBtn.style.padding = "0.5rem 1.5rem";
	submitBtn.style.borderRadius = "5px";
	submitBtn.style.cursor = "pointer";

	submitBtn.addEventListener("click", () => {
		const name = input.value.trim();
		if (!name) {
			error.textContent = "Folder name cannot be empty.";
			input.focus();
			return;
		}
		if (onSubmit) onSubmit(name);
		overlay.remove();
	});

	input.addEventListener("keydown", e => {
		if (e.key === "Enter") submitBtn.click();
		if (e.key === "Escape") overlay.remove();
	});

	btnRow.appendChild(submitBtn);
	btnRow.appendChild(cancelBtn);
	modal.appendChild(btnRow);
	overlay.appendChild(modal);
	document.body.appendChild(overlay);
	input.focus();
}
