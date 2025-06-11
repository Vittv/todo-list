import "../../styles/modal.css";

export function showConfirmModal({ message, onConfirm, onCancel }) {
	// Remove any existing modal
	const existing = document.getElementById("confirm-modal");
	if (existing) existing.remove();

	const overlay = document.createElement("div");
	overlay.id = "confirm-modal";
	overlay.className = "modal-overlay";

	const modal = document.createElement("div");
	modal.className = "modal-box";

	const title = document.createElement("div");
	title.className = "";

	const msg = document.createElement("div");
	msg.textContent = message;
	msg.className = "modal-message";

	const btnRow = document.createElement("div");
	btnRow.className = "modal-btn-row";

	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Delete";
	confirmBtn.className = "modal-submit-btn";
	confirmBtn.addEventListener("click", () => {
		overlay.remove();
		if (onConfirm) onConfirm();
	});

	const cancelBtn = document.createElement("button");
	cancelBtn.textContent = "Cancel";
	cancelBtn.className = "modal-cancel-btn";
	cancelBtn.addEventListener("click", () => {
		overlay.remove();
		if (onCancel) onCancel();
	});

	btnRow.appendChild(confirmBtn);
	btnRow.appendChild(cancelBtn);
	modal.appendChild(title);
	modal.appendChild(msg);
	modal.appendChild(btnRow);
	overlay.appendChild(modal);
	document.body.appendChild(overlay);
}
