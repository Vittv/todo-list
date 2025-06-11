import "../../styles/modal.css";

export function showTaskModal({ folderId, initialTask = {}, onSubmit, mode = "add" }) {
	// Remove any existing modal
	const existing = document.getElementById("task-modal");
	if (existing) existing.remove();

	const overlay = document.createElement("div");
	overlay.id = "task-modal";
	overlay.className = "modal-overlay";

	const modal = document.createElement("div");
	modal.className = "modal-box";

	const title = document.createElement("h2");
	title.textContent = mode === "edit" ? "Edit Task" : "Add Task";
	title.style.textAlign = "center";
	modal.appendChild(title);

	// Title
	const inputTitle = document.createElement("input");
	inputTitle.type = "text";
	inputTitle.placeholder = "Title (required)";
	inputTitle.value = initialTask.title || "";
	inputTitle.className = "";
	modal.appendChild(inputTitle);

	// Description
	const inputDesc = document.createElement("textarea");
	inputDesc.placeholder = "Description";
	inputDesc.value = initialTask.description || "";
	inputDesc.className = "";
	modal.appendChild(inputDesc);

	// Due Date
	const inputDue = document.createElement("input");
	inputDue.type = "date";
	inputDue.value = initialTask.dueDate || "";
	inputDue.className = "";
	modal.appendChild(inputDue);

	// Priority
	const priorityLabel = document.createElement("label");
	priorityLabel.textContent = "Priority: ";
	priorityLabel.className = "";
	const inputPriority = document.createElement("select");
	["Low", "Medium", "High"].forEach(p => {
		const opt = document.createElement("option");
		opt.value = p;
		opt.textContent = p;
		inputPriority.appendChild(opt);
	});
	inputPriority.value = initialTask.priority || "Low";
	inputPriority.className = "";
	priorityLabel.appendChild(inputPriority);
	modal.appendChild(priorityLabel);

	// Notes
	const inputNotes = document.createElement("textarea");
	inputNotes.placeholder = "Notes";
	inputNotes.value = initialTask.notes || "";
	inputNotes.className = "";
	modal.appendChild(inputNotes);

	// Checklist
	const checklistLabel = document.createElement("label");
	checklistLabel.textContent = "Checklist:";
	checklistLabel.className = "";
	modal.appendChild(checklistLabel);

	const checklistDiv = document.createElement("div");
	checklistDiv.className = "checklist-div";
	modal.appendChild(checklistDiv);

	const checklistItems = (initialTask.checkList || initialTask.checklist || []).map(item => ({ ...item }));
	function renderChecklist() {
		checklistDiv.innerHTML = "";
		checklistItems.forEach((item, idx) => {
			const row = document.createElement("div");
			row.style.display = "flex";
			row.style.alignItems = "center";
			row.style.gap = "0.5rem";

			const cb = document.createElement("input");
			cb.type = "checkbox";
			cb.checked = item.done;
			cb.addEventListener("change", () => item.done = cb.checked);

			const text = document.createElement("input");
			text.type = "text";
			text.value = item.text;
			text.className = "";
			text.addEventListener("input", () => item.text = text.value);

			const delBtn = document.createElement("button");
			delBtn.textContent = "✕";
			delBtn.title = "Remove item";
			delBtn.className = "modal-del-btn";
			delBtn.addEventListener("click", () => {
				checklistItems.splice(idx, 1);
				renderChecklist();
			});

			row.appendChild(cb);
			row.appendChild(text);
			row.appendChild(delBtn);
			checklistDiv.appendChild(row);
		});
	}

	renderChecklist();

	const addChecklistBtn = document.createElement("button");
	addChecklistBtn.textContent = "+ Add checklist item";
	addChecklistBtn.className = "add-checklist-btn";
	addChecklistBtn.addEventListener("click", () => {
		checklistItems.push({ text: "", done: false });
		renderChecklist();
	});
	modal.appendChild(addChecklistBtn);

	// Error message
	const error = document.createElement("div");
	error.className = "error-message";
	modal.appendChild(error);

	// Buttons
	const btnRow = document.createElement("div");
	btnRow.className = "modal-btn-row";

	const cancelBtn = document.createElement("button");
	cancelBtn.textContent = "Cancel";
	cancelBtn.className = "modal-cancel-btn";
	cancelBtn.addEventListener("click", () => overlay.remove());

	const submitBtn = document.createElement("button");
	submitBtn.textContent = mode === "edit" ? "Save" : "Add";
	submitBtn.className = "modal-submit-btn";

	submitBtn.addEventListener("click", () => {
		const title = inputTitle.value.trim();
		if (!title) {
			error.textContent = "Task title is required.";
			inputTitle.focus();
			return;
		}
		const task = {
			title,
			description: inputDesc.value.trim(),
			dueDate: inputDue.value || null,
			priority: inputPriority.value,
			notes: inputNotes.value.trim(),
			checkList: checklistItems.filter(i => i.text.trim()),
			folderId,
		};
		if (onSubmit) onSubmit(task);
		overlay.remove();
	});

	inputTitle.addEventListener("keydown", e => {
		if (e.key === "Enter") submitBtn.click();
		if (e.key === "Escape") overlay.remove();
	});

	btnRow.appendChild(submitBtn);
	btnRow.appendChild(cancelBtn);
	modal.appendChild(btnRow);
	overlay.appendChild(modal);
	document.body.appendChild(overlay);
	inputTitle.focus();
}
