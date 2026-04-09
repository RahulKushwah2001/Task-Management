import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col justify-between">
        
        <div>
          <h2 className="text-2xl font-bold mb-8">🚀 TaskFlow</h2>

          <ul className="space-y-3">
            <li className="bg-gray-700 p-3 rounded-lg cursor-pointer">
              📊 Dashboard
            </li>
          </ul>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <input
              placeholder="Search..."
              className="border px-3 py-1 rounded-lg"
            />

            <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
              U
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}