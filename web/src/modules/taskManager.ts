import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";


let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  // Initialize the first two tasks as the first group in the In Progress section
  tasks[0].isActive = true; // First task is active and can be completed
  tasks[1].isActive = false; // Second task is locked until the first task is completed
  tasks[0].completed = false;
  tasks[1].completed = false;

  for (let i = 2; i < tasks.length; i++) {
    tasks[i].isActive = false; // Remaining tasks are locked initially
    tasks[i].completed = false; // Ensure all tasks are marked as not completed
  }
}

// Fetch tasks that are currently active
export function getActiveTasks(): Task[] {
  return tasks.filter(task => task.isActive && !task.completed);
}

// Fetch tasks that are completed
export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

// Fetch all tasks regardless of status
export function getAllTasks(): Task[] {
  return tasks;
}

// Mark a task as completed and unlock the next task in sequence if applicable
export function completeTask(taskId: number): void {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1 && tasks[taskIndex].isActive) {
    tasks[taskIndex].completed = true;
    tasks[taskIndex].isActive = false;

    // Unlock the next task in the group
    const nextTaskIndex = taskIndex + 1;
    if (nextTaskIndex < tasks.length && tasks[nextTaskIndex].group === tasks[taskIndex].group) {
      tasks[nextTaskIndex].isActive = true;
    }
  }
  // Move the next task in the sequence to the In Progress section
  const nextGroupTaskIndex = taskIndex + 2;
  if (nextGroupTaskIndex < tasks.length) {
    tasks[nextGroupTaskIndex].isActive = true;
  }
}


// Create a new task and add it to the list
export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    description,
    persona,
    group,
    isActive: false,
    completed: false
  };
  tasks.push(newTask);
}

// Update the details of an existing task
export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, ...updatedTask }
    }
    return task;
  });
}

// Delete a task from the list
export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}