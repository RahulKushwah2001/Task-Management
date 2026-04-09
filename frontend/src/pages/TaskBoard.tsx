import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { api } from "../api/client";
import Column from "../components/Column";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date?: string;
}

export default function TaskBoard() {
  const { id } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?project_id=${id}`);
      setTasks(
        Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.tasks || []
      );
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    if (id) fetchTasks();
  }, [id]);

  const createTask = async () => {
    try {
      setLoading(true);

      await api.post("/tasks", {
        title,
        status: "todo",
        project_id: Number(id),
        due_date: dueDate || null,
      });

      toast.success("Task created");
      setOpen(false);
      setTitle("");
      setDueDate("");
      fetchTasks();
    } catch {
      toast.error("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  const todo = filteredTasks.filter((t) => t.status === "todo");
  const inProgress = filteredTasks.filter((t) => t.status === "in-progress");
  const done = filteredTasks.filter((t) => t.status === "done");

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-indigo-600"
    >
        ← Back to Projects
    </button>
    <div className="flex justify-between"></div>
        <h1 className="text-2xl font-bold">Task Board</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* FILTER */}
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <DragDropContext
        onDragEnd={async (result) => {
          if (!result.destination) return;

          const taskId = Number(result.draggableId);
          const newStatus = result.destination.droppableId;

          try {
            await api.put(`/tasks/${taskId}`, {
              status: newStatus,
            });

            fetchTasks();
          } catch {
            toast.error("Error updating task");
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column title="todo" tasks={todo} onEdit={setEditTask} refresh={fetchTasks} />
          <Column title="in-progress" tasks={inProgress} onEdit={setEditTask} refresh={fetchTasks} />
          <Column title="done" tasks={done} onEdit={setEditTask} refresh={fetchTasks} />
        </div>
      </DragDropContext>

      {/* CREATE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="mb-4 font-bold">Create Task</h2>

            <input
              placeholder="Task title"
              className="border p-2 w-full mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 w-full mb-3"
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button
              onClick={createTask}
              disabled={loading}
              className="bg-indigo-600 text-white w-full py-2 rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="mb-4 font-bold">Edit Task</h2>

            <input
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <input
              value={editTask.description || ""}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <input
              type="date"
              value={editTask.due_date || ""}
              onChange={(e) =>
                setEditTask({ ...editTask, due_date: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <button
              onClick={async () => {
                try {
                  await api.put(`/tasks/${editTask.id}`, editTask);
                  toast.success("Updated!");
                  setEditTask(null);
                  fetchTasks();
                } catch {
                  toast.error("Update failed");
                }
              }}
              className="bg-indigo-600 text-white w-full py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}