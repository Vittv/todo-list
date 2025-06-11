import "../../styles/modal.css";

export function showFolderModal({ onSubmit, initialName = "" } = {}) {
	// Remove any existing modal
	const existing = document.getElementById("folder-modal");
	if (existing) existing.remove();

	// Modal overlay
	const overlay = document.createElement("div");
	overlay.id = "folder-modal";
	overlay.className = "modal-overlay";

	// Modal box
	const modal = document.createElement("div");
	modal.className = "modal-box";

	const title = document.createElement("h2");
	title.textContent = initialName ? "Edit Folder" : "Add Folder";
	title.className = "";
	modal.appendChild(title);

	const input = document.createElement("input");
	input.type = "text";
	input.value = initialName;
	input.placeholder = "Folder name";
	input.className = "";
	modal.appendChild(input);

	const error = document.createElement("div");
	error.className = "error-message";
	modal.appendChild(error);

	const btnRow = document.createElement("div");
	btnRow.className = "modal-btn-row";

	const cancelBtn = document.createElement("button");
	cancelBtn.textContent = "Cancel";
	cancelBtn.className = "modal-cancel-btn";
	cancelBtn.addEventListener("click", () => overlay.remove());

	const submitBtn = document.createElement("button");
	submitBtn.textContent = initialName ? "Save" : "Add";
	submitBtn.className = "modal-submit-btn";

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
