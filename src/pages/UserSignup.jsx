import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserSignup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup = () => {
    const missing = [];

    if (!form.fullName)
      missing.push("Full Name");

    if (!form.email)
      missing.push("Email");

    if (!form.phone)
      missing.push("Phone");

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

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    alert("User Account Created");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex justify-center items-center p-8">

      <div className="w-full max-w-3xl bg-slate-900 rounded-[40px] p-10 border border-slate-800">

        <h1 className="text-5xl font-bold text-center text-white">
          User Registration
        </h1>

        <p className="text-center text-slate-400 mt-4 mb-8">
          Create your FixIt account
        </p>

        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500 p-4 rounded-xl text-red-400">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white"
          />

          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white"
          />

        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mt-5 p-4 rounded-xl bg-slate-800 text-white"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mt-5 p-4 rounded-xl bg-slate-800 text-white"
        />

        <button
          onClick={handleSignup}
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl"
        >
          Create Account
        </button>

        <p className="text-center text-slate-400 mt-8">

          Already Registered?

          <Link
            to="/user-login"
            className="text-cyan-400 ml-2"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  );
}