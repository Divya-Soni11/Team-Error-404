import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding, // Swapped to a corporate asset building icon
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import API from "../data/api.js"; // Central Axios instance

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter Business Email and Password.");
      return;
    }

    setLoading(true);

    try {
      // 🌟 Pointing to your explicit corporate authentication endpoint
      const response = await API.post("/auth/login-company", {
        email: email,
        password: password,
      });

      // Extract token and save corporate status parameters
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "company"); // 🌟 Tagged explicitly as company scope

      alert("Company Login Successful");
      navigate("/"); // Redirect to your new clean products dashboard layout
    } catch (err) {
      setError(err.response?.data?.message || "Invalid corporate credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-2/5 flex-col justify-center p-12 bg-gradient-to-b from-[#020617] to-[#07112f]">
        <h1 className="text-6xl font-bold text-white">
          FixIt.ai
        </h1>

        <h2 className="text-5xl mt-20 font-bold">
          <span className="text-cyan-400">Company</span>
          <br />
          <span className="text-white">Login Portal</span>
        </h2>

        <p className="text-slate-400 mt-6 text-xl">
          Manage corporate assets, view product performance metrics, and track service requests.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-2xl bg-slate-900 rounded-[40px] p-10 border border-slate-800">
          
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
              <FaBuilding className="text-white text-3xl" /> {/* Swapped user icon out for enterprise icon */}
            </div>
          </div>

          <h1 className="text-5xl font-bold text-center text-white">
            Company Login
          </h1>

          <p className="text-center text-slate-400 mt-4 mb-8">
            Login to access your workspace
          </p>

          {/* Dynamic Error Banner */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500 p-4 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Business Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5 border border-slate-700 focus:border-cyan-500 outline-none disabled:opacity-50"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none disabled:opacity-50"
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-cyan-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying Credentials..." : "Login"}
          </button>

          <p className="text-center text-slate-400 mt-8">
            New Business?
            <Link to="/companySignup" className="text-cyan-400 ml-2 hover:underline">
  Create Company Account
</Link>
          </p>

        </div>
      </div>

    </div>
  );
}