import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

TaskForm.propTypes = {
  onTaskCreatedTaskForm: PropTypes.func.isRequired,
};

function TaskForm({ onTaskCreatedTaskForm }) {
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !responsable || !status) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const newTask = { description, responsable, status };

    try {
      const response = await fetch("http://localhost:3000/insert-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([newTask]),
      });

      if (response.ok) {
        const createdTasks = await response.json();
        const createdTask = createdTasks[0];
        onTaskCreatedTaskForm(createdTask);
        setDescription("");
        setResponsable("");
        setStatus("todo");
        setError(null);
      } else {
        console.error("Erro ao criar a tarefa");
        setError("Falha ao criar a tarefa.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Ocorreu um erro.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
        <DialogDescription>
          Preencha os detalhes da nova tarefa abaixo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            className="col-span-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="responsable" className="text-right">
            Responsable
          </Label>
          <Input
            id="responsable"
            className="col-span-3"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select onValueChange={setStatus} value={status}>
            <SelectTrigger id="status" className="col-span-3">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="doing">Doing</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DialogFooter>
        <Button type="submit" className="bg-indigo-700 w-full">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export default TaskForm;
