import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

TaskCard.propTypes = {
  status: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    responsable: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    computer: PropTypes.string.isRequired,
  }).isRequired,
};

export function TaskCard({ status, color, task }) {
  return (
    <Card key={task.id} className="mt-4 w-full">
      <CardHeader className="font-bold">{task.description}</CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Responsável: {task.responsable}</p>
        <p className="text-sm text-gray-500">Computador: {task.computer}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Badge className={cn(color)}>{status}</Badge>
      </CardFooter>
    </Card>
  );
}
