import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Box } from '@mui/material';
import TaskCard from './TaskCard';
import { getActiveTasks, getCompletedTasks, getAllTasks, completeTask } from '@/modules/taskManager';
import Task from '@/model/Task';

export default function TaskBoard() {
    const [_, setUpdate] = useState(false); 

    const handleCompleteTask = (taskId: number) => {
        completeTask(taskId);
        setUpdate((prev) => !prev); 
    };

    const allTasks = getAllTasks();
    const inProgressTasks = getActiveTasks();
    const completedTasks = getCompletedTasks();

    const firstTask = allTasks.find(task => task.id === 1);

    const renderTaskSection = (title: string, tasks: Task[]) => (
        <Box sx={{ marginBottom: '30px' }}>
            <h2>{title}</h2>
            <Grid container spacing={2}>
                {tasks.map(task => (
                    <Grid item xs={6} key={task.id}>
                        <TaskCard
                            task={task}
                            onComplete={handleCompleteTask}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <Container>
            {renderTaskSection("In Progress", firstTask ? [firstTask] : inProgressTasks)}
            {renderTaskSection("To Do", allTasks.filter(task => !task.completed && task.id !== 1 && !task.isActive))}
            {renderTaskSection("Completed", completedTasks)}
        </Container>
    );
}
