export interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export interface TaskFormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  editingTask: Task | null;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}
export interface TaskCardProps {
  task: Task;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onComplete: (id: string, e: React.MouseEvent) => void;
  onEdit: (task: Task, e: React.MouseEvent) => void;
}
