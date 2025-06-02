export default function createConfirmModal(message, onConfirm, onCancel) {
	const modal = document.createElement("div");
	modal.classList.add("modal-overlay");

	const modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");

	const msg = document.createElement("p");
	msg.textContent = message;

	const yesBtn = document.createElement("button");
	yesBtn.textContent = "Yes";
	yesBtn.classList.add("confirm-btn");
	yesBtn.addEventListener("click", () => {
		document.body.removeChild(modal);
		onConfirm();
	});

	const noBtn = document.createElement("button");
	noBtn.textContent = "No";
	noBtn.classList.add("cancel-btn");
	noBtn.addEventListener("click", () => {
		document.body.removeChild(modal);
		if (onCancel) onCancel();
	});

	modalContent.appendChild(msg);
	modalContent.appendChild(yesBtn);
	modalContent.appendChild(noBtn);
	modal.appendChild(modalContent);
	document.body.appendChild(modal);
}