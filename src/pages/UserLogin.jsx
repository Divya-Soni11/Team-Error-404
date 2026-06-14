import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError(
        "Please enter Email and Password."
      );
      return;
    }

    alert("User Login Successful");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-2/5 flex-col justify-center p-12 bg-gradient-to-b from-[#020617] to-[#07112f]">

        <h1 className="text-6xl font-bold text-white">
          FixIt.ai
        </h1>

        <h2 className="text-5xl mt-20 font-bold">
          <span className="text-cyan-400">
            User
          </span>
          <br />
          <span className="text-white">
            Login Portal
          </span>
        </h2>

        <p className="text-slate-400 mt-6 text-xl">
          Access diagnostics, maintenance
          reminders and AI support.
        </p>

      </div>

      {/* RIGHT */}

      <div className="flex-1 flex justify-center items-center p-8">

        <div className="w-full max-w-2xl bg-slate-900 rounded-[40px] p-10 border border-slate-800">

          <div className="flex justify-center mb-6">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">

              <FaUser className="text-white text-3xl" />

            </div>

          </div>

          <h1 className="text-5xl font-bold text-center text-white">
            User Login
          </h1>

          <p className="text-center text-slate-400 mt-4 mb-8">
            Login to continue
          </p>

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500 p-4 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5"
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 text-white"
            />

            <button
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-cyan-400"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl"
          >
            Login
          </button>

          <p className="text-center text-slate-400 mt-8">

            New User?

            <Link
              to="/user-signup"
              className="text-cyan-400 ml-2"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}