import { useRef } from "react";
import Task from "./Task.jsx";
import "./TasksList.css";

export default function TasksList({ tasks, onComplete, onDelete, onDragAndDrop}) {
  const taskQuantity = tasks?.length;
  const completedTaskQuantity = tasks?.filter((task) => task.isCompleted,).length;
  const dragTask = useRef(0);
  const draggedOverTask = useRef(0);

  const handleOnDragStart = (event, index) => {
    dragTask.current = index;
    event.currentTarget.classList.add("dragging");
  };

  const handleOnDragEnd = (event) => {
    event.currentTarget.classList.remove("dragging");
    onDragAndDrop(dragTask, draggedOverTask);
  };

  return (
    <div className="todo-list__task-list">
      <header className="todo-list__task-list__header">
        <div>
          <p>Created Tasks</p>
          <span>{taskQuantity}</span>
        </div>
        <div>
          <p>Completed Tasks</p>
          <span>{`${completedTaskQuantity} of ${taskQuantity}`}</span>
        </div>
      </header>

      <div className="todo-list__task-list__list">
        {tasks.map((task, index) => {
          return (
            <Task
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              draggable
              onDragStart={(event) => handleOnDragStart(event, index)}
              onDragEnter={() => (draggedOverTask.current = index)}
              onDragEnd={(event) => handleOnDragEnd(event)}
              onDragOver={(e) => e.preventDefault()}
            />
          );
        })}
      </div>
    </div>
  );
}
