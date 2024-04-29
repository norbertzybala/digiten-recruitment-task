import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import TasksList from "./TasksList.jsx";
import "./TodoList.css";

const LOCAL_STORAGE_KEY = "todo:savedTasks";
export default function TodoList() {
  const [taskList, setTasksList] = useState([
    {
      id: crypto.randomUUID(),
      title: "Go to training",
      isCompleted: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Read a chapter of a book",
      isCompleted: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Learning React",
      isCompleted: false,
    },
  ]);

  // Handle load data from Local Storage
  const loadSavedTasks = () => {
    const updatedTasksList = localStorage.getItem(LOCAL_STORAGE_KEY);
    updatedTasksList && setTasksList(JSON.parse(updatedTasksList));
  };

  // Save data in Local Storage and set state
  const setTasksAndSaveLocal = (updatedTasksList) => {
    setTasksList(updatedTasksList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasksList));
  };

  // Load data with first render
  useEffect(() => {
    loadSavedTasks();
  }, []);

  // Add new task
  const handleAddNewTask = (taskTitle) => {
    setTasksAndSaveLocal([
      ...taskList,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      },
    ]);
  };

  // Handle completed functionality
  const toggleTaskCompleted = (taskId) => {
    const updatedTasksList = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasksAndSaveLocal(updatedTasksList);
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasksList = taskList.filter((task) => task.id !== taskId);
    setTasksAndSaveLocal(updatedTasksList);
  };

  const handleDragAndDrop = (dragTask, draggedOverTask) => {
    const taskListClone = [...taskList];
    const temp = taskListClone[dragTask.current];
    taskListClone[dragTask.current] = taskListClone[draggedOverTask.current];
    taskListClone[draggedOverTask.current] = temp;
    setTasksAndSaveLocal(taskListClone);
  };

  return (
    <section className="todo-list">
      <Header onAddTask={handleAddNewTask} />
      <TasksList
        tasks={taskList}
        onComplete={toggleTaskCompleted}
        onDelete={handleDeleteTask}
        onDragAndDrop={handleDragAndDrop}
      />
    </section>
  );
}
