export const sidebarData = [
    { title: "Inbox", items: ["Buy Milk", "Reply to Email"], deletable: false },
    { title: "Tasks", items: ["Tidy Bedroom", "Portfolio Site"], deletable: false },
    { title: "Due", items: ["Doctor Appointment", "Call Mom"], deletable: false },
    { title: "Something", items: ["Do stuff"], deletable: true}
];

export function addCategory(title, items = []) {
    sidebarData.push({ title, items, deletable: true });
}