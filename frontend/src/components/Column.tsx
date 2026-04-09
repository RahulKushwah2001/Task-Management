import { Droppable, Draggable } from "@hello-pangea/dnd";
import { api } from "../api/client";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date?: string;
}

export default function Column({
  title,
  tasks,
  onEdit,
  refresh,
}: {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  refresh: () => void;
}) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 p-4 rounded-xl min-h-[400px]"
        >
          <h2 className="font-semibold mb-4 capitalize">{title}</h2>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition cursor-grab"
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className="font-medium cursor-pointer"
                        onClick={() => onEdit(task)}
                      >
                        {task.title}
                      </h3>

                      <button
                        onClick={async () => {
                          try {
                            await api.delete(`/tasks/${task.id}`);
                            toast.success("Task deleted");
                            refresh();
                          } catch {
                            toast.error("Delete failed");
                          }
                        }}
                        className="text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">
                      {task.description}
                    </p>

                    {task.due_date && (
                      <p className="text-xs text-gray-400 mt-1">
                        📅 {task.due_date}
                      </p>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
          </div>

          {provided.placeholder}

          {tasks.length === 0 && (
            <p className="text-gray-400 text-sm">No tasks</p>
          )}
        </div>
      )}
    </Droppable>
  );
}