export function showTaskModal({ folderId, initialTask = {}, onSubmit, mode = "add" }) {
	// Remove any existing modal
	const existing = document.getElementById("task-modal");
	if (existing) existing.remove();

	const overlay = document.createElement("div");
	overlay.id = "task-modal";
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

	const modal = document.createElement("div");
	modal.style.background = "#222";
	modal.style.padding = "2rem";
	modal.style.borderRadius = "10px";
	modal.style.boxShadow = "0 2px 16px #0008";
	modal.style.display = "flex";
	modal.style.flexDirection = "column";
	modal.style.gap = "1rem";
	modal.style.minWidth = "350px";

	const title = document.createElement("h2");
	title.textContent = mode === "edit" ? "Edit Task" : "Add Task";
	title.style.textAlign = "center";
	modal.appendChild(title);

	// Title
	const inputTitle = document.createElement("input");
	inputTitle.type = "text";
	inputTitle.placeholder = "Title (required)";
	inputTitle.value = initialTask.title || "";
	inputTitle.style.fontSize = "1.1rem";
	inputTitle.style.padding = "0.5rem";
	inputTitle.style.borderRadius = "5px";
	inputTitle.style.border = "1px solid #444";
	inputTitle.style.background = "#111";
	inputTitle.style.color = "#fff";
	modal.appendChild(inputTitle);

	// Description
	const inputDesc = document.createElement("textarea");
	inputDesc.placeholder = "Description";
	inputDesc.value = initialTask.description || "";
	inputDesc.style.fontSize = "1.1rem";
	inputDesc.style.padding = "0.5rem";
	inputDesc.style.borderRadius = "5px";
	inputDesc.style.border = "1px solid #444";
	inputDesc.style.background = "#111";
	inputDesc.style.color = "#fff";
	inputDesc.style.minHeight = "2.5em";
	modal.appendChild(inputDesc);

	// Due Date
	const inputDue = document.createElement("input");
	inputDue.type = "date";
	inputDue.value = initialTask.dueDate || "";
	inputDue.style.fontSize = "1.1rem";
	inputDue.style.padding = "0.5rem";
	inputDue.style.borderRadius = "5px";
	inputDue.style.border = "1px solid #444";
	inputDue.style.background = "#111";
	inputDue.style.color = "#fff";
	modal.appendChild(inputDue);

	// Priority
	const priorityLabel = document.createElement("label");
	priorityLabel.textContent = "Priority: ";
	priorityLabel.style.color = "#fff";
	priorityLabel.style.fontSize = "1.1rem";
	priorityLabel.style.marginTop = "0.5rem";
	const inputPriority = document.createElement("select");
	["Low", "Medium", "High"].forEach(p => {
		const opt = document.createElement("option");
		opt.value = p;
		opt.textContent = p;
		inputPriority.appendChild(opt);
	});
	inputPriority.value = initialTask.priority || "Low";
	inputPriority.style.marginLeft = "0.5em";
	inputPriority.style.fontSize = "1.1rem";
	inputPriority.style.padding = "0.2rem 0.5rem";
	inputPriority.style.borderRadius = "5px";
	inputPriority.style.border = "1px solid #444";
	inputPriority.style.background = "#111";
	inputPriority.style.color = "#fff";
	priorityLabel.appendChild(inputPriority);
	modal.appendChild(priorityLabel);

	// Notes
	const inputNotes = document.createElement("textarea");
	inputNotes.placeholder = "Notes";
	inputNotes.value = initialTask.notes || "";
	inputNotes.style.fontSize = "1.1rem";
	inputNotes.style.padding = "0.5rem";
	inputNotes.style.borderRadius = "5px";
	inputNotes.style.border = "1px solid #444";
	inputNotes.style.background = "#111";
	inputNotes.style.color = "#fff";
	inputNotes.style.minHeight = "2em";
	modal.appendChild(inputNotes);

	// Checklist
	const checklistLabel = document.createElement("label");
	checklistLabel.textContent = "Checklist:";
	checklistLabel.style.color = "#fff";
	checklistLabel.style.fontSize = "1.1rem";
	modal.appendChild(checklistLabel);

	const checklistDiv = document.createElement("div");
	checklistDiv.style.display = "flex";
	checklistDiv.style.flexDirection = "column";
	checklistDiv.style.gap = "0.5rem";
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
			text.style.flex = "1";
			text.style.background = "#111";
			text.style.color = "#fff";
			text.style.border = "1px solid #444";
			text.style.borderRadius = "5px";
			text.style.padding = "0.2rem 0.5rem";
			text.addEventListener("input", () => item.text = text.value);

			const delBtn = document.createElement("button");
			delBtn.textContent = "✕";
			delBtn.title = "Remove item";
			delBtn.style.background = "none";
			delBtn.style.color = "#ff8a80";
			delBtn.style.border = "none";
			delBtn.style.fontSize = "1.1rem";
			delBtn.style.cursor = "pointer";
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
	addChecklistBtn.style.background = "#333";
	addChecklistBtn.style.color = "#fff";
	addChecklistBtn.style.border = "none";
	addChecklistBtn.style.padding = "0.3rem 1rem";
	addChecklistBtn.style.borderRadius = "5px";
	addChecklistBtn.style.cursor = "pointer";
	addChecklistBtn.addEventListener("click", () => {
		checklistItems.push({ text: "", done: false });
		renderChecklist();
	});
	modal.appendChild(addChecklistBtn);

	// Error message
	const error = document.createElement("div");
	error.style.color = "#ff8a80";
	error.style.fontSize = "1rem";
	error.style.height = "1.2em";
	modal.appendChild(error);

	// Buttons
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
	submitBtn.textContent = mode === "edit" ? "Save" : "Add";
	submitBtn.style.background = "#1b6fc4";
	submitBtn.style.color = "#fff";
	submitBtn.style.border = "none";
	submitBtn.style.padding = "0.5rem 1.5rem";
	submitBtn.style.borderRadius = "5px";
	submitBtn.style.cursor = "pointer";

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
