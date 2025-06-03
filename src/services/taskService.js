const defaultTask = {
	description: "No description yet. Start editing this task!",
	subtasks: ["Add your first subtask.."]
};

const tasks = {
	"Buy Milk": {
	description: "Buy 2L of whole milk from the grocery store.",
    subtasks: ["Check fridge", "Write shopping list", "Go to store"],
  	},
  	"Reply to Email": {
    description: "Respond to Alex about the logo feedback.",
    subtasks: ["Open email", "Draft response", "Attach file", "Send"],
 	 },
  	"Doctor Appointment": {
    description: "Annual check-up at the clinic.",
    subtasks: ["Find insurance card", "Check time", "Arrive 15 mins early"],
  	},
  	"Call Mom": {
    description: "Catch up on the weekend and share updates.",
    subtasks: ["Schedule time", "Charge phone", "Find quiet space"],
  	},
};

export function getTask(name) {
	return tasks[name] || null;
}

export function addTask(name, description = "", subtasks = []) {
	tasks[name] = { description, subtasks };
}
