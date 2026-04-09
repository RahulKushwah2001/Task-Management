import { useState } from "react";
import { api } from "../api/client";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
        toast.error("All fields are required");
        return;
    }
    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      toast.success("Account created successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}