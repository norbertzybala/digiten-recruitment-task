import { useState } from "react";
import { PlusIcon } from "../../icons/icons.jsx";
import "./Header.css";

export default function Header({ onAddTask }) {
  const [title, setTitle] = useState("");

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    onAddTask(title);
    setTitle("");
  };

  return (
    <header className="todo-list__header">
      <h2 className="todo-list__header__heading">Get things done!</h2>

      <form
        onSubmit={handleSubmit}
        className="todo-list__header__new-task-form"
      >
        <input
          placeholder="Add a new task"
          type="text"
          value={title}
          onChange={onChangeTitle}
          required={true}
          minLength={3}
        />
        <button>
          Create <PlusIcon />
        </button>
      </form>
    </header>
  );
}
