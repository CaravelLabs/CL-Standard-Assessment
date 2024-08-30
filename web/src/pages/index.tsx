import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Badge from '@mui/material/Badge';
import { useEffect, useState } from "react";
import Task from "@/model/Task";
import { getAllTasks, getPendingTasks, initializeTasks, getActiveTasks, completeTask, getCompletedTasks, scheduleTask, getTasksByGroup, updateTaskCompleteion } from "@/modules/taskManager";
const inter = Inter({ subsets: ["latin"] });
import Card from "@/components/Card";
import Head from "next/head";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeTasks();
    const allTasks = getAllTasks();
    setTasks(allTasks);
    setPendingTasks(getPendingTasks());
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
    console.log(activeTasks);
  }, []);

  const updateTaskLists = () => {
    const pendingTasks = getPendingTasks();
    const activeTasks = getActiveTasks();
    const nextTask = pendingTasks.find(task => !task.completed && !task.inprogress);
    if (nextTask) {
      // Move the task to in progress
      scheduleTask(nextTask.id);
      activeTasks.push(nextTask);
      // Remove the task from active tasks
      pendingTasks.splice(pendingTasks.indexOf(nextTask), 1); // Remove the task from pendingTasks
    }
    
    setPendingTasks(pendingTasks);
    setActiveTasks(activeTasks);
    setCompletedTasks(getCompletedTasks());
  };

  const isReady = (grp: number) => {
    const mainGroup = activeTasks[0].group;
    return mainGroup === grp;
  }



  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="description" content="Task Board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App">
        <div className={`${styles.navbar} ${inter.className}`}>Task Board</div>
        <div className={`${styles.main}`}>
          <div className={`${styles.container}`}>
            <div className={`${styles.heading}`}>
              <h1 className={`${inter.className}`}>To-do
                <Badge badgeContent={pendingTasks.length} showZero color="secondary" />
              </h1>
            </div>
            <div className={`${styles.grid}`}>
              {pendingTasks.map((task) => (
                <Card key={task.id} taskId={task.id} title={task.title} description={task.description} active={false} completed={task.completed} onDone={() => { }} />
              ))}
            </div>

          </div>


          <div className={`${styles.container}`}>
          <div className={`${styles.heading}`}>
            <h1 className={`${inter.className}`}>In Progress
              <Badge badgeContent={activeTasks.length} showZero color="primary" />
            </h1>
            </div>
            <div className={`${styles.grid}`}>
              {activeTasks.map((task) => (
                <Card key={task.id} taskId={task.id} title={task.title} description={task.description} active={isReady(task.group)} completed={task.completed} onDone={() => { completeTask(task.title); updateTaskLists(); }} />
              ))}
            </div>
          </div>


          <div className={`${styles.container}`}>
          <div className={`${styles.heading}`}>
            <h1 className={`${inter.className}`}>Completed
              <Badge badgeContent={completedTasks.length} showZero color="success" />
            </h1>
            </div>
            <div className={`${styles.grid}`}>
              {completedTasks.map((task) => (
                <Card key={task.id} taskId={task.id} title={task.title} description={task.description} active={task.inprogress} completed={task.completed} onDone={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
