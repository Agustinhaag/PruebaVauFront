import React from "react";
import { TaskFormProps } from "../helpers/types";
import FormToDoList from "./FormToDoList";

const ContainerForm: React.FC<TaskFormProps> = ({
  editingTask,
  setEditingTask,
  setTasks,
  tasks,
}) => {
  return (
    <div className="bg-neutral-950 bg-opacity-95 p-3 rounded md:w-1/2 xs:w-3/4 w-11/12 mx-auto">
      <h2
        className="mt-2 mb-4 text-xl"
        style={{
          textDecoration: "1.5px underline #4285F4",
          textUnderlineOffset: "3px",
        }}
      >
        Añadir una nueva tarea:
      </h2>
      <FormToDoList
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default ContainerForm;
