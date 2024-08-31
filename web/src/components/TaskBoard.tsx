import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Box, Badge } from '@mui/material';
import TaskCard from './TaskCard';
import { getActiveTasks, getCompletedTasks, getAllTasks, completeTask, initializeTasks } from '@/modules/taskManager';
import Task from '@/model/Task';


export default function TaskBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTasks, setActiveTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    useEffect(() => {
        initializeTasks();
        setTasks(getAllTasks());
        setActiveTasks(getActiveTasks());
        setCompletedTasks(getCompletedTasks());
    }, []);

    const handleCompleteTask = (taskID: number) => {
        const completedTask = tasks.find(task => task.id === taskID);
    
        if (!completedTask) return;
    
        completeTask(completedTask.id);  // Mark the task as completed
    
        // Move the next task in the group to "In Progress"
        const nextTask = tasks.find(task => task.group === completedTask.group && !task.completed && !task.isActive);
    
        if (nextTask) {
            nextTask.isActive = true;
        }
    
        // Ensure only the first task in the active tasks list is enabled
        setTasks(getAllTasks());
        setActiveTasks(getActiveTasks());
        setCompletedTasks(getCompletedTasks());
    };
    
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <h2>
                    To Do <Badge badgeContent={tasks.length - activeTasks.length - completedTasks.length} color="primary" />
                </h2>
                <div className="grid-container">
                    {tasks.filter(task => !task.isActive && !task.completed).map(task => (
                        <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} />
                    ))}
                </div>
            </Grid>

            <Grid item xs={4}>
                <h2>
                    In Progress <Badge badgeContent={activeTasks.length} color="primary" />
                </h2>
                {activeTasks.map(task => (
                    <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} />
                ))}
            </Grid>
            <Grid item xs={4}>
                <h2>
                    Completed <Badge badgeContent={completedTasks.length} color="primary" />
                </h2>
                {completedTasks.map(task => (
                    <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} />
                ))}
            </Grid>
        </Grid>
    );
}