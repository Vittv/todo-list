export const sidebarData = [
    { title: "Inbox", items: ["Buy Milk", "Reply to Email"], deletable: false },
    { title: "Due", items: ["Doctor Appointment", "Call Mom"], deletable: false },
];

export function addTaskToFolder(folderTitle, taskName) {
    const folder = sidebarData.find(f => f.title === folderTitle);
    if (folder) {
        folder.items.push(taskName);
    } else {
        console.warn(`Folder "${folderTitle}" not found`);
    }
}

export function addCategory(title, items = []) {
    sidebarData.push({ title, items, deletable: true });
}