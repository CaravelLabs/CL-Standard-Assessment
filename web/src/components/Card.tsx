import React from 'react';
import styles from "@/styles/Home.module.css";
import { Button } from '@mui/material';
import { Inter } from 'next/font/google';
import { getAllTasks, getActiveTasks } from '@/modules/taskManager';
const inter = Inter({ subsets: ["latin"] });

interface CardProps {
    taskId: number;
    title: string;
    description: string;
    active: boolean;
    completed: boolean;
    onDone: () => void;
}

const Card: React.FC<CardProps> = ({ taskId, title, description, active, completed, onDone }) => {

    const handleClick = () => {
        onDone();
    };

   /*  const isReady = () => {
        const mainGroup = inProgressTasks[0].group;
        tasks.map((task) => {
          if (task.group !== mainGroup) {
            return false;
          }
        });
        return true;
      } */

    return (
        <div className={`${styles.card} ${inter.className}`}>
            <h2>Task {taskId}
            { !completed ? <Button variant="contained" disabled={!active} size='small' onClick={handleClick}>Done</Button> : null }
            </h2>
            <span>{title}</span>
            <p>{description}</p>
        </div>
    );
};

export default Card;