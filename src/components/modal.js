export default function createModal(preselectedFolder, onSubmit, folderNames = []) {
	const modal = document.createElement("div");
	modal.classList.add("modal-overlay");

	const modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");

	const form = document.createElement("form");

	// Task Name Input
	const nameLabel = document.createElement("label");
	nameLabel.textContent = "Task Name:";
	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.name = "taskName";
	nameInput.required = true;

	// Description Input
	const descLabel = document.createElement("label");
	descLabel.textContent = "Description:";
	const descInput = document.createElement("textarea");
	descInput.name = "description";

	// Folder Selector (only show if no folder preselected)
	let folderSelect = null;
	if (!preselectedFolder) {
		const folderLabel = document.createElement("label");
		folderLabel.textContent = "Select Folder:";

		folderSelect = document.createElement("select");
		folderSelect.name = "folder";
		folderSelect.required = true;

		folderNames.forEach(folder => {
			const option = document.createElement("option");
			option.value = folder;
			option.textContent = folder;
			folderSelect.appendChild(option);
		});

		form.appendChild(folderLabel);
		form.appendChild(folderSelect);
	}

	// If folder is preselected, store it in a hidden input instead
	if (preselectedFolder) {
		const hiddenFolderInput = document.createElement("input");
		hiddenFolderInput.type = "hidden";
		hiddenFolderInput.name = "folder";
		hiddenFolderInput.value = preselectedFolder;
		form.appendChild(hiddenFolderInput);
	}

	// Submit button
	const submitBtn = document.createElement("button");
	submitBtn.type = "submit";
	submitBtn.textContent = "Create";

	// Cancel button
	const cancelBtn = document.createElement("button");
	cancelBtn.type = "button";
	cancelBtn.textContent = "Cancel";
	cancelBtn.addEventListener("click", () => {
		document.body.removeChild(modal);
	});

	form.appendChild(nameLabel);
	form.appendChild(nameInput);
	form.appendChild(descLabel);
	form.appendChild(descInput);
	form.appendChild(submitBtn);
	form.appendChild(cancelBtn);

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const taskName = nameInput.value.trim();
		const description = descInput.value.trim();
		const folder = preselectedFolder || (folderSelect && folderSelect.value);

		if (!taskName || !folder) {
			// Simple validation
			alert("Please enter a task name and select a folder.");
			return;
		}

		onSubmit({ taskName, description, folder });

		document.body.removeChild(modal);
	});

	modalContent.appendChild(form);
	modal.appendChild(modalContent);
	document.body.appendChild(modal);

	nameInput.focus();
}
