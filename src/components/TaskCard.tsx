import React from "react";
import { TaskCardProps } from "../helpers/types";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onComplete,
  onEdit,
}) => {
  return (
    <div
      key={task.id}
      className={` flex min-h-28 xs:flex-row flex-col justify-between items-center p-4 rounded-bl-3xl rounded-tr-3xl bg-neutral-800 bg-opacity-85 `}
    >
      <div className=" flex-1">
        <span
          className={`cursor-pointer sm:text-base text-sm ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.task}
        </span>
      </div>
      <div className=" flex sm:flex-row xs:flex-col flex-row sm:items-center xs:items-end items-center gap-2 xs:pt-0 pt-1">
        <button
          type="button"
          className="text-blue-500 border w-9 border-blue-500 hover:bg-blue-500 rounded-lg p-2 hover:text-white"
          onClick={(e) => onEdit(task, e)}
        >
          <MdEdit />
        </button>
        <button
          type="button"
          className="text-red-500 border w-9 border-red-500 hover:bg-red-500 rounded-lg p-2 hover:text-white"
          onClick={(e) => onDelete(task.id, e)}
        >
          <FaTrash />
        </button>
        <button
          type="button"
          className={`rounded-md p-2 text-white ${
            task.completed
              ? "bg-neutral-600 hover:bg-neutral-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
          onClick={(e) => onComplete(task.id, e)}
        >
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
