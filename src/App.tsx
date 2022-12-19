import "./global.css";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { NewTask } from "./components/NewTask";
import { useState } from "react";
import { Task } from "./components/Task";
import { Info } from "./components/Info";
import Clipboard from "./assets/Clipboard.svg"

export interface TaskProps {
  id: string;
  text: string;
  completed?: boolean;
  inactive?: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [createdCount, setCreatedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const handleNewTaskCreation = (text: string) => {
    const newTask = {
      id: `Task ${tasks.length}`,
      text,
    };
    const newTasksState = [...tasks, newTask];
    setTasks(newTasksState);
    updateCreatedAndCompletedCounts(newTasksState);
  };

  const handleCompleteToggle = (id: string) => {
    const currentTasksState = [...tasks];
    const taskToUpdate = currentTasksState.find((task) => task.id === id);
    if (!taskToUpdate) return console.error("Invalid task ID!");
    taskToUpdate.completed = taskToUpdate.completed ? false : true;
    const newTasksState = currentTasksState;
    setTasks(newTasksState);
    updateCreatedAndCompletedCounts(newTasksState);
  };

  const handleDelete = (id: string) => {
    const currentTasksState = [...tasks];
    const taskToDelete = currentTasksState.find((task) => task.id === id);
    if (!taskToDelete) return console.error("Invalid task ID!");
    taskToDelete.inactive = true;
    const newTasksState = currentTasksState;
    setTasks(newTasksState);
    updateCreatedAndCompletedCounts(newTasksState);
  };

  const updateCreatedAndCompletedCounts = (updatedTasksArray: TaskProps[]) => {
    //const activeTasks = updatedTasksArray.filter(task => !task.inactive);
    setCreatedCount(
      updatedTasksArray.reduce((acc, cur) => acc + (cur.inactive ? 0 : 1), 0)
    );
    setCompletedCount(
      updatedTasksArray.reduce(
        (acc, cur) => acc + (!cur.inactive && cur.completed ? 1 : 0),
        0
      )
    );
  };

  return (
    <>
      <Header />
      <main>
        <NewTask onNewTaskButtonClick={handleNewTaskCreation} />
        <div className={styles.wrapper}>
          <Info created={createdCount} completed={completedCount} />
          {tasks.filter((task) => !task.inactive).length ? (
            <>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  onCompleteToggle={handleCompleteToggle}
                  onDelete={handleDelete}
                  {...task}
                />
              ))}
            </>
          ) : (
            <div className={styles.emptyTaskList}>
              <img src={Clipboard} alt="clipboard icon" />
              <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
