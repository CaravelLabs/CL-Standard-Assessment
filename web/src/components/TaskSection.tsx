import React from 'react';
import TaskCard from '@/components/TaskCard';

interface TaskSectionProps {
    title: string;
    tasks: any[];  // Adjust this to your actual Task type
    onComplete: (taskID: number) => void;
}

export default function TaskSection(props: TaskSectionProps) {
    const handleComplete = (taskID: number) => {
        // Implement your logic for handling task completion here
        // For example: props.onComplete(taskId);
    };

    return (
        <div>
            <h2>{props.title}</h2>
            {props.tasks.map(task => (
                <TaskCard key={task.id} task={task} onComplete={handleComplete} />
            ))}
        </div>
    );
}
