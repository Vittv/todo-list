import { save, load } from "./storage";

const TASKS_KEY = "tasks";
const defaultTasks = [
	{
		id: 1,
  		folderId: 1,
  		title: "Finish report",
  		description: "Write the monthly financial report and email it to management.",
  		dueDate: "2025-06-15",
  		priority: "High",
  		notes: "Make sure to check the latest sales numbers.",
  		checkList: [
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
			{ text: "Send invitations", done: true },
			{ text: "Order cake", done: true},
			{ text: "Decorate house", done: false },
		],
		done: false,
	},
	{
		id: 4,
		folderId: "__today",
		title: "Hello!",
		description: "Welcome to my todo-list app c:",
		dueDate: "",
		priority: "Hi",
		notes: "I tried to make this nice, so hopefully:",
		checkList: [
			{ text: "The layout is easy to understand and use", done: true },
			{ text: "The UI and theme switching are pleasant", done: true },
			{ text: "This app can be of some use to you", done: true },
			{ text: "Thank you for trying it out!", done: true },
		],
		done: false,
	},
	{
		id: 5,
		folderId: "__today",
		title: "About the app",
		description: "Feel free to delete this and have your own tasks",
		dueDate: "",
		priority: "Hello",
		notes: "Some information about the app:",
		checkList: [
			{ text: "Made with Webpack, plain HTML, CSS and JS", done: true },
			{ text: "All data is stored in your browser's local storage", done: true },
			{ text: "Which means this data won't be the same on different devices", done: false },
			{ text: "That's all, goodbye forever", done: true },
		],
		done: false,
	},
	{
		id: 6,
		folderId: "__today",
		title: "Finish todo-list app",
		description: "Attempt to finish The Odin Project's todo-list app assignment.",
		dueDate: "2025-06-12",
		priority: "High",
		notes: "Make sure to separate logic and DOM",
		checkList :[
			{ text: "Add logic and data management", done: true },
			{ text: "Add DOM manipulation and rendering", done: true},
			{ text: "Add UI design and themes", done: true},
			{ text: "Deploy app", done: true},
		],
		done: true,
	},
];

let tasks = load(TASKS_KEY, defaultTasks);

export function getTasks(folderId = null) {
	if (folderId === null) {
		return tasks;
	}
	return tasks.filter(task => task.folderId === folderId);
}

export function setTasks(newTasks) {
	tasks = newTasks;
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
		checkList: taskData.checkList || [],
		done: false,
	};
	tasks.push(newTask);
	save(TASKS_KEY, tasks);
	return newTask;
}

export function deleteTask(id) {
	const index = tasks.findIndex(task => task.id === id);
	if (index !== -1) {
		tasks.splice(index, 1);
		save(TASKS_KEY, tasks);
		return true;
	}
	return false;
}

export function updateTaskDone(id, done) {
	const idx = tasks.findIndex(task => task.id === id);
	if (idx !== -1) {
		tasks[idx].done = done;
		save(TASKS_KEY, tasks);
	}
}