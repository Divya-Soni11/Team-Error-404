
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaBolt,
  FaHeadset,
} from "react-icons/fa";

export default function UserSignup() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const getPasswordStrength = () => {
    const pass = form.password;

    if (pass.length < 8) return 20;

    let score = 20;

    if (/[A-Z]/.test(pass))
      score += 20;

    if (/[a-z]/.test(pass))
      score += 20;

    if (/\d/.test(pass))
      score += 20;

    if (/[@$!#%*?&]/.test(pass))
      score += 20;

    return Math.min(score, 100);
  };

  const isValidPassword = (
    password
  ) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!#%*?&]/.test(password)
    );
  };

  const handleSignup = () => {
    setError("");
    setSuccess("");

    const missing = [];

    if (!form.fullName)
      missing.push("Full Name");

    if (!form.email)
      missing.push("Email");

    if (!form.phone)
      missing.push(
        "Phone Number"
      );

    if (!form.city)
      missing.push("City");

    if (!form.password)
      missing.push("Password");

    if (!form.confirmPassword)
      missing.push(
        "Confirm Password"
      );

    if (missing.length > 0) {
      setError(
        `Please fill: ${missing.join(
          ", "
        )}`
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        form.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (
      form.phone.length < 10
    ) {
      setError(
        "Please enter a valid phone number."
      );
      return;
    }

    if (
      !isValidPassword(
        form.password
      )
    ) {
      setError(
        "Password must contain 8+ chars, uppercase, lowercase, number & special character."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Password and Confirm Password do not match."
      );
      return;
    }

    setSuccess(
      "User Account Created Successfully!"
    );

    setTimeout(() => {
      window.location.href =
        "/user-login";
    }, 1500);
  };

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

          <h2 className="text-5xl font-bold mt-20">
            <span className="text-cyan-400">
              Welcome
            </span>{" "}
            <span className="text-white">
              to
            </span>
            <br />
            <span className="text-blue-400">
              User Portal
            </span>
          </h2>

          <p className="text-slate-400 mt-6 text-xl">
            Create your account and access AI-powered diagnostics.
          </p>

        </div>

        <div className="space-y-6">

          <div className="bg-slate-900 p-5 rounded-2xl flex gap-4">
            <FaShieldAlt className="text-cyan-400 text-2xl mt-1" />

            <div>
              <h3 className="text-white font-semibold">
                Secure & Reliable
              </h3>

              <p className="text-slate-400">
                Enterprise-grade security
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl flex gap-4">
            <FaBolt className="text-purple-400 text-2xl mt-1" />

            <div>
              <h3 className="text-white font-semibold">
                AI Insights
              </h3>

              <p className="text-slate-400">
                Smart diagnostics
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl flex gap-4">
            <FaHeadset className="text-green-400 text-2xl mt-1" />

            <div>
              <h3 className="text-white font-semibold">
                24/7 Support
              </h3>

              <p className="text-slate-400">
                Round-the-clock support
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex justify-center items-center p-8">

        <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-[40px] p-10">

          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
              <FaUser className="text-white text-4xl" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-center text-white">
            User Registration
          </h1>

          <p className="text-center text-slate-400 mt-4 mb-8">
            Create your FixIt AI account
          </p>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-500/10 border border-green-500 text-green-400 p-4 rounded-xl">
              {success}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5">

            <InputField
              icon={<FaUser />}
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />

            <InputField
              icon={<FaEnvelope />}
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              icon={<FaPhone />}
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <InputField
              icon={<FaMapMarkerAlt />}
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

          </div>

          {/* PASSWORD */}

          <div className="relative mt-5 group">

            <FaLock className="absolute left-4 top-5 text-slate-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-4 rounded-xl bg-slate-800 text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-5 text-cyan-400"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

            <div className="absolute left-0 -bottom-8 hidden group-hover:block text-xs text-cyan-300 bg-slate-800 px-3 py-1 rounded-lg border border-cyan-500">
              Use 8+ chars, Uppercase, Number & Symbol
            </div>

          </div>

          <div className="mt-5">
            <div className="w-full h-2 bg-slate-700 rounded-full">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-400"
                style={{
                  width: `${getPasswordStrength()}%`,
                }}
              />
            </div>
          </div>

          <div className="relative mt-5">

            <FaLock className="absolute left-4 top-5 text-slate-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                form.confirmPassword
              }
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-4 rounded-xl bg-slate-800 text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-5 text-cyan-400"
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {form.confirmPassword && (
            <p
              className={`mt-2 text-sm ${
                form.password ===
                form.confirmPassword
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {form.password ===
              form.confirmPassword
                ? "✓ Passwords Match"
                : "✗ Passwords Do Not Match"}
            </p>
          )}

          <button
            onClick={handleSignup}
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl"
          >
            Create Account
          </button>

          <p className="text-center text-slate-400 mt-8">

            Already have an account?

            <Link
              to="/user-login"
              className="text-cyan-400 ml-2"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

function InputField({
  icon,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <div className="absolute left-4 top-5 text-slate-400">
        {icon}
      </div>

      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 p-4 rounded-xl bg-slate-800 text-white outline-none"
      />

    </div>
  );
}

