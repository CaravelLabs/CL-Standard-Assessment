
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";



let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
    tasks = [...initialTasks];
    const startTasks: Task[] = getTasksByGroup(1);
    startTasks.map((task) => {
        scheduleTask(task.id);
    });
}

export function getPendingTasks(): Task[] {
    return tasks.filter((task) => !task.completed && !task.inprogress);
}

export function getActiveTasks(): Task[] {
    return tasks.filter((task) => task.inprogress && !task.completed);
}

export function getCompletedTasks(): Task[] {
    return tasks.filter((task) => task.completed);
}

export function getTasksByGroup(group: number): Task[] {
    return tasks.filter((task) => task.group === group);
}

export function updateTaskCompleteion(): Task | null {
    const pendingTasks = getPendingTasks();
    const nextTask = pendingTasks.find(task => !task.completed && !task.inprogress);
    if (nextTask) {
        // Move the task to in progress
        scheduleTask(nextTask.id);
    }
    return nextTask || null;
}


export function scheduleTask(taskID: number): Task[] {
    tasks.map((task) => {
        if (task.id === taskID) {
            task.inprogress = true; // task is in progress
        }
        return task;
    });
    return tasks;
}



export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(title: String): Task[] {
    tasks.map((task) => {
        if (task.title === title) {
            task.completed = true;
        }
        return task;
    });
    return tasks;
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTask = new Task(tasks.length + 1, title, description, persona, group);
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            return { ...task, ...updatedTask };
        }
        return task;
    });
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter((task) => task.id !== taskId);
}
