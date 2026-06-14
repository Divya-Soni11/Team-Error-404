import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaBolt,
  FaHeadset,
} from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [error, setError] = useState("");

  const handleLogin = () => {
  setError("");

  if (!email.trim()) {
    setError("Please enter Email.");
    return;
  }

  if (!password.trim()) {
    setError("Please enter Password.");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError(
      "Please enter a valid email address."
    );
    return;
  }

 localStorage.setItem(
  "role",
  "company"
);

window.location.href =
  "/company";
  
  return (
    <div className="min-h-screen bg-[#020617] flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-2/5 flex-col justify-between p-12 bg-gradient-to-b from-[#020617] to-[#07112f]">

        <div>

          <h1 className="text-6xl font-bold text-white">
            FixIt.ai
          </h1>

          <p className="text-slate-400 mt-4 text-xl">
            AI Powered Product Support
            <br />
            & Maintenance Platform
          </p>

        </div>

        <div className="space-y-8">

          <div className="flex gap-4">

            <div className="bg-blue-500/20 p-4 rounded-2xl">
              <FaShieldAlt className="text-cyan-400 text-2xl" />
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold">
                Secure & Reliable
              </h3>

              <p className="text-slate-400">
                Enterprise-grade security
                to protect your data
              </p>
            </div>

          </div>

          <div className="flex gap-4">

            <div className="bg-purple-500/20 p-4 rounded-2xl">
              <FaBolt className="text-purple-400 text-2xl" />
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold">
                AI-Powered Insights
              </h3>

              <p className="text-slate-400">
                Smart analytics and
                predictions
              </p>
            </div>

          </div>

          <div className="flex gap-4">

            <div className="bg-green-500/20 p-4 rounded-2xl">
              <FaHeadset className="text-green-400 text-2xl" />
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold">
                24/7 Support
              </h3>

              <p className="text-slate-400">
                We're here whenever you need us
              </p>
            </div>

          </div>

        </div>

        <div className="text-center text-slate-500">
          Your data is secure and encrypted
        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex justify-center items-center p-8">

        <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-[40px] p-12 shadow-2xl">

          {/* Lock Icon */}

          <div className="flex justify-center mb-6">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">

              <FaLock className="text-white text-4xl" />

            </div>

          </div>

          <h1 className="text-6xl font-bold text-center text-white">
            Welcome Back
          </h1>

          <p className="text-center text-slate-400 text-xl mt-4 mb-10">
            Login to your company account
          </p>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">
              {error}
            </div>
          )}

          {/* EMAIL */}

          <label className="text-white font-medium block mb-2">
            Company Email
          </label>

          <div className="relative mb-6">

            <FaEnvelope className="absolute left-5 top-5 text-slate-400" />

            <input
              type="email"
              placeholder="Enter your company email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full pl-14 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-500"
            />

          </div>

          {/* PASSWORD */}

          <label className="text-white font-medium block mb-2">
            Password
          </label>

          <div className="relative mb-6">

            <FaLock className="absolute left-5 top-5 text-slate-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full pl-14 pr-20 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-5 top-4 text-cyan-400"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          

          {/* REMEMBER */}

          <div className="flex justify-between items-center mb-8">

            <label className="flex items-center gap-2 text-slate-300">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              Remember Me

            </label>

            <button className="text-purple-400 hover:text-purple-300">
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              text-white
              font-bold
              text-2xl
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
            "
          >
            Login
          </button>

          {/* SIGNUP */}

          <p className="text-center text-slate-400 mt-8">

            Don't have an account?

            <Link
              to="/signup"
              className="text-cyan-400 ml-2 hover:text-cyan-300"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}