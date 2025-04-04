import { useState } from "react";
import axios from "axios";
import api from "../api/axios";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await api.post("/auth/register", { name, email, password });
    alert("Registered! Now login.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <input className="w-full p-2 border rounded mb-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="w-full p-2 border rounded mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 border rounded mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
      <p className="mt-2 text-center">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
    </div>
    </div>
  );
}

export default Register;
