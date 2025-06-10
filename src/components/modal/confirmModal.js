export function showConfirmModal({ message, onConfirm, onCancel }) {
	// Remove any existing modal
	const existing = document.getElementById("confirm-modal");
	if (existing) existing.remove();

	const overlay = document.createElement("div");
	overlay.id = "confirm-modal";
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
	modal.style.gap = "1.5rem";
	modal.style.minWidth = "300px";
	modal.style.alignItems = "center";

	const msg = document.createElement("div");
	msg.textContent = message;
	msg.style.color = "#fff";
	msg.style.fontSize = "1.3rem";
	msg.style.textAlign = "center";
	modal.appendChild(msg);

	const btnRow = document.createElement("div");
	btnRow.style.display = "flex";
	btnRow.style.gap = "1.5rem";
	btnRow.style.justifyContent = "center";

	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Delete";
	confirmBtn.style.background = "#ff5252";
	confirmBtn.style.color = "#fff";
	confirmBtn.style.border = "none";
	confirmBtn.style.padding = "0.5rem 1.5rem";
	confirmBtn.style.borderRadius = "5px";
	confirmBtn.style.cursor = "pointer";
	confirmBtn.addEventListener("click", () => {
		overlay.remove();
		if (onConfirm) onConfirm();
	});

	const cancelBtn = document.createElement("button");
	cancelBtn.textContent = "Cancel";
	cancelBtn.style.background = "#444";
	cancelBtn.style.color = "#fff";
	cancelBtn.style.border = "none";
	cancelBtn.style.padding = "0.5rem 1.5rem";
	cancelBtn.style.borderRadius = "5px";
	cancelBtn.style.cursor = "pointer";
	cancelBtn.addEventListener("click", () => {
		overlay.remove();
		if (onCancel) onCancel();
	});

	btnRow.appendChild(confirmBtn);
	btnRow.appendChild(cancelBtn);
	modal.appendChild(btnRow);
	overlay.appendChild(modal);
	document.body.appendChild(overlay);
}
