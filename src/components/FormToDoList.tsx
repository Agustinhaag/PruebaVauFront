import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Task, TaskFormProps } from "../helpers/types";
import "../App.css";
import ButtonForm from "./ButtonForm";
import Swal from "sweetalert2";

const TaskForm: React.FC<TaskFormProps> = ({
  tasks,
  setTasks,
  editingTask,
  setEditingTask,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<{ task: string }>({
    defaultValues: {
      task: editingTask ? editingTask.task : "", 
    },
  });

  useEffect(() => {
    if (editingTask) {
      setValue("task", editingTask.task); 
    } else {
      reset(); 
    }
  }, [editingTask, setValue, reset]); 

  const saveTasksToLocalStorage = (newTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = (values: { task: string }) => {
    setLoading(true);
    setTimeout(() => {
      const newTask: Task = {
        id: Date.now().toString(),
        task: values.task,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      reset(); 
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setLoading(false);
      Swal.fire({
        title: "¡Tarea creada!",
        text: "Se ha gestionado exitosamente la tarea",
        icon: "success",
      });
    }, 3000);
  };

  const handleSaveEdit = (values: { task: string }) => {
    setLoading(true);
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, task: values.task } : task
      );
      setTasks(updatedTasks);
      reset(); 
      setEditingTask(null); 
      saveTasksToLocalStorage(updatedTasks);
      setLoading(false);
      Swal.fire({
        title: "¡Tarea editada!",
        text: "Se ha gestionado exitosamente la tarea",
        icon: "success",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(editingTask ? handleSaveEdit : handleAddTask)}>
      <div className="flex flex-col items-start gap-2.5">
        <div className="w-full">
          <div className="cont-input">
            <textarea
              {...register("task", { required: "Este campo es obligatorio" })}
              className={`resize-none ${errors.task || error ? "error" : ""} input`}
              placeholder=" "
              autoFocus
            />
            <label
              htmlFor="task"
              className={`${errors.task || error ? "errorLabel" : ""} label`}
            >
              {editingTask ? "Editar tarea" : "Nueva tarea"}
            </label>
          </div>
          <div className="flex w-full">
            {errors.task && (
              <span className="span w-full" style={{ color: "red" }}>
                {errors.task.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full justify-center mb-5">
          <ButtonForm loading={loading} name="Guardar" />
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
