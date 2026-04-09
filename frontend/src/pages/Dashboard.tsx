import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => navigate(`/projects/${p.id}`)}
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">{p.title}</h2>

              <button
                onClick={async (e) => {
                  e.stopPropagation(); 
                  await api.delete(`/projects/${p.id}`);
                  toast.success("Deleted");
                  fetchProjects();
                }}
                className="text-red-500 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 text-sm">{p.description}</p>

            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
              {p.status}
            </span>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="mb-4 font-bold">Create Project</h2>

            <input
              placeholder="Title"
              className="border p-2 w-full mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Description"
              className="border p-2 w-full mb-3"
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={async () => {
                try {
                  await api.post("/projects", {
                    title,
                    description,
                    status: "active",
                  });

                  toast.success("Project created");
                  setOpen(false);
                  fetchProjects();
                } catch {
                  toast.error("Error creating project");
                }
              }}
              className="bg-indigo-600 text-white w-full py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}