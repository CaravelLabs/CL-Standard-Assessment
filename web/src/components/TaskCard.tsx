// import React from 'react';
// import Task from '@/model/Task';
// import { Card, Button } from '@mui/material';

// interface TaskCardProps {
//     task: Task;
//     onComplete: (taskId: number) => void;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
//     return (
//         <Card variant='outlined'>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <Button
//                 variant='text'
//                 disabled={task.completed || (task.id !== 1 && !task.completed)}
//                 onClick={() => onComplete(task.id)}
//             >
//                 Done
//             </Button>
//         </Card>
//     );
// };

// export default TaskCard;

import React from 'react';
import { Card, Button } from '@mui/material';
import Task from '@/model/Task';

interface TaskCardProps {
    task: Task;
    onComplete: (taskId: number) => void;
}

export default function TaskCard({ task, onComplete }: TaskCardProps) {
    return (
        <Card style={{ marginBottom: '10px' }}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <Button
                variant="contained"
                color="primary"
                disabled={!task.isActive}
                onClick={() => onComplete(task.id)}
            >
                Done
            </Button>
        </Card>
    );
}