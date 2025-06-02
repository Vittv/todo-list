export default function createFolderModal(onSubmit) {
	const modal = document.createElement("div");
	modal.classList.add("modal-overlay");

	const modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");

	const form = document.createElement("form");

	const nameLabel = document.createElement("label");
	nameLabel.textContent = "Folder Name:";

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.name = "folderName";
	nameInput.required = true;

	const submitBtn = document.createElement("button");
	submitBtn.type = "submit";
	submitBtn.textContent = "Create Folder";

	const cancelBtn = document.createElement("button");
	cancelBtn.type = "button";
	cancelBtn.textContent = "Cancel";
	cancelBtn.addEventListener("click", () => {
		document.body.removeChild(modal);
	});

	form.appendChild(nameLabel);
	form.appendChild(nameInput);
	form.appendChild(submitBtn);
	form.appendChild(cancelBtn);

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const folderName = nameInput.value.trim();
		if (!folderName) {
			alert("Folder name is required");
			return;
		}

		onSubmit(folderName);
		document.body.removeChild(modal);
	});

	modalContent.appendChild(form);
	modal.appendChild(modalContent);
	document.body.appendChild(modal);

	nameInput.focus();
}