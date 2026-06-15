import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../data/api.js"; // Central Axios instance

export default function CompanySignup() {
  const [form, setForm] = useState({
    companyName: "", // Clear naming for company scope
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirecting after successful registration

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    setError("");
    const missing = [];

    // Validation checks for company fields
    if (!form.companyName) missing.push("Company Name");
    if (!form.email) missing.push("Business Email");
    if (!form.password) missing.push("Password");
    if (!form.confirmPassword) missing.push("Confirm Password");

    if (missing.length > 0) {
      setError(`Please fill: ${missing.join(", ")}`);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 🌟 Pointing to your explicit company registration route
      const response = await API.post("/auth/register-company", {
        name: form.companyName, // Maps frontend 'companyName' to your backend schema 'name'
        email: form.email,
        password: form.password,
      });

      alert(response.data.message || "Company Account Registered Successfully!");
      navigate("/companyLogin"); // Redirect to company login panel route
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex justify-center items-center p-8">
      <div className="w-full max-w-3xl bg-slate-900 rounded-[40px] p-10 border border-slate-800">
        
        <h1 className="text-5xl font-bold text-center text-white">
          Company Registration
        </h1>

        <p className="text-center text-slate-400 mt-4 mb-8">
          Register your business on the FixIt platform
        </p>

        {/* Dynamic Error Banner */}
        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500 p-4 rounded-xl text-red-400">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Business Email Address"
            value={form.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
          />
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mt-5 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mt-5 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Registering Business..." : "Create Company Account"}
        </button>

        <p className="text-center text-slate-400 mt-8">
          Already Registered?
          <Link to="/login" className="text-cyan-400 ml-2 hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}