export const sidebarData = [
    { title: 'Inbox', items: ['Buy Milk', 'Reply to Email'] },
    { title: "Tasks", items: ["Tidy Bedroom", "Portfolio Site"] },
    { title: 'Due', items: ['Doctor Appointment', 'Call Mom'] },
];

export function addCategory(title, items = []) {
    sidebarData.push({ title, items });
}