import { useEffect, useState } from "react";
import { AddTaskButton } from "./AddTaskButton";
import { TasksBoard } from "./TasksBoard";

export function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Erro ao buscar as tarefas");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchTasks();
  });

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
  };

  const todo = tasks.filter((task) => task.status === "todo");
  const doing = tasks.filter((task) => task.status === "doing");
  const done = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex justify-center items-start gap-8 my-10 mx-auto w-full max-w-7xl">
      <AddTaskButton onTaskCreated={handleTaskCreated} />
      <TasksBoard title="To Do" color="bg-red-500" tasks={todo} />
      <TasksBoard title="Doing" color="bg-yellow-500" tasks={doing} />
      <TasksBoard title="Done" color="bg-green-700" tasks={done} />
    </div>
  );
}
