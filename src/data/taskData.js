const tasks = [
	{
		id: 1,
  		folderId: 1,
  		title: "Finish report",
  		description: "Write the monthly financial report and email it to management.",
  		dueDate: "2025-06-15",
  		priority: "High",
  		notes: "Make sure to check the latest sales numbers.",
  		checklist: [
			{ text: "Collect data", done: true },
			{ text: "Write draft", done: false },
			{ text: "Review with team", done: false }
  		],
  		done: false,
	},
	{
		id: 2,
		folderId: 1,
		title: "Prepare presentation",
		description: "Create slides for Monday's client meeting.",
		dueDate: "2025-06-10",
		priority: "Medium",
		notes: "Include last quarter's sales figures and marketing plan.",
		checkList: [
			{ text: "Gather data", done: true },
      		{ text: "Design slides", done: false },
      		{ text: "Practice delivery", done: false },
		],
		done: false,
	},
	{
		id: 3,
		folderId: 2,
		title: "Plan birthday party",
		description: "Organize a surprise birthday party for Sarah.",
		dueDate: "2025-06-20",
		priority: "Low",
		notes: "Invite close friends and family.",
		checkList: [
			{ text: "Send invitations", done: false },
			{ text: "Order cake", done: false},
			{ text: "Decorate house", done: false },
		],
		done: false,
	},
];

export function getTasks(folderId = null) {
	if (folderId === null) {
		return tasks;
	}
	return tasks.filter(task => task.folderId === folderId);
}

export function addTask(taskData) {
	const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

	const newTask = {
		id: newId,
		folderId: taskData.folderId,
		title: taskData.title,
		description: taskData.description || "",
		dueDate: taskData.dueDate || null,
		priority: taskData.priority || "Low",
		notes: taskData.notes || "",
		checklist: taskData.checkList || [],
		done: false,
	};

	tasks.push(newTask);
	return newTask;
}

export function deleteTask(id) {
	const index = tasks.findIndex(task => task.id === id);
	if (index !== -1) {
		tasks.splice(index, 1);
		return true;
	}
	return false;
}