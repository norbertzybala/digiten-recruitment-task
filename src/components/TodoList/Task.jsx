import {CheckIcon, TrashIcon} from "../../icons/icons.jsx";
import './Task.css';

export default function Task( {task, onComplete, onDelete, ...props}) {
    return (
        <div className='todo-list-task'  {...props} >
            <button className={`todo-list-task__check-button ${task.isCompleted ? 'checked' : undefined}`} onClick={()=> onComplete(task.id)}>
               <div>
                   <CheckIcon />
               </div>
            </button>

            <p className={`todo-list-task__title ${task.isCompleted ? 'completed' : undefined}`}>{task.title}</p>

            <button className='todo-list-task__delete-button' onClick={()=>onDelete(task.id)}>
                <TrashIcon />
            </button>
        </div>
    );
}