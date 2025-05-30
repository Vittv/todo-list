export const taskData = {
	"Tidy Bedroom": {
		description: "Declutter and clean bedroom",
		subtasks: ["Make bed", "Vacuum floor", "Organize closet"]
	},
	"Portfolio Site": {
		description: "Build and deploy personal portfolio website",
		subtasks: ["Design layout", "Write content", "Push to GitHub"]
	}
};

export function getTask(name) {
	return taskData[name] || null;
}
