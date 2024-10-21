import PropTypes from "prop-types";
import { TaskCard } from "./TaskCard";
import { Separator } from "./ui/separator";

TasksBoard.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      responsable: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      computer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export function TasksBoard({ title, color, tasks }) {
  return (
    <div className="p-4 border-solid rounded-2xl bg-gray-200/[0.4] flex flex-col flex-1 items-center">
      <header className="p-2 text-sm flex items-center gap-2">
        <strong>{title}</strong>
        <span>( {tasks.length} )</span>
      </header>
      {tasks.length > 0 && <Separator className="mt-1" />}
      {tasks.map((task) => {
        return (
          <TaskCard key={task.id} status={title} color={color} task={task} />
        );
      })}
    </div>
  );
}
