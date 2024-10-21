import PropTypes from "prop-types";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

AddTaskButton.propTypes = {
  onTaskCreated: PropTypes.func.isRequired,
};

export function AddTaskButton({ onTaskCreated }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTaskCreated = (newTask) => {
    onTaskCreated(newTask);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="fixed bottom-8 right-8">
        <Button className="bg-indigo-700">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <TaskForm onTaskCreatedTaskForm={handleTaskCreated} />
      </DialogContent>
    </Dialog>
  );
}
