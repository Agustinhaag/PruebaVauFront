import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { Task } from "../helpers/types";
import ContainerForm from "../components/ContainerForm";
import Swal from "sweetalert2";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    const result = await Swal.fire({
      title: "¿Esta seguro que desea eliminar la tarea?",
      text: "Esta acción es definitiva.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar.",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) {
      Swal.fire({
        title: "Operación cancelada",
        text: "La tarea aún esta disponible.",
        icon: "info",
      });
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    Swal.fire({
      title: "¡Tarea eliminada!",
      text: "Se ha eliminado exitosamente la tarea",
      icon: "success",
    });
  };

  const handleComplete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEdit = (task: Task, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingTask(task);
  };

  return (
    <main
      className="flex flex-col pt-2 bg-cover min-h-screen text-custom-white"
      style={{ backgroundImage: "url(/tareas1.jpg)" }}
    >
      <ContainerForm
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        setTasks={setTasks}
        tasks={tasks}
      />
      <div className="flex flex-col gap-2 mt-5 xs:w-3/4 w-11/12 mx-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </main>
  );
};

export default Tasks;
