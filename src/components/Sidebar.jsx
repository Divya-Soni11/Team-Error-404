import { NavLink } from "react-router-dom";
import { FaHome, FaList, FaBuilding } from "react-icons/fa";

export default function Sidebar() {
  // Check auth state
  const role = localStorage.getItem("role");
  const isCompany = role === "company";

  return (
    <div className="w-72 min-h-screen bg-black border-r border-cyan-900">
      
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-6xl font-bold text-cyan-400">
          FixIt.ai
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-10 px-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 p-5 rounded-2xl text-2xl transition-all ${
              isActive
                ? "bg-slate-800 text-cyan-400"
                : "text-white hover:bg-slate-900"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        {role === "user" && (
          <NavLink
            to="/diagnostic"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-xl text-xl ${
                isActive
                  ? "bg-slate-800 text-cyan-400"
                  : "text-white hover:bg-slate-900"
              }`
            }
          >
            <FaRobot />
            Diagnostic
          </NavLink>
        )}

        {role === "company" && (
          <>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                `flex items-center gap-4 p-5 rounded-2xl text-2xl transition-all ${
                  isActive
                    ? "bg-slate-800 text-cyan-400"
                    : "text-white hover:bg-slate-900"
                }`
              }
            >
              <FaBuilding />
              Add Product
            </NavLink>

          </>
        )}
      </nav>

    </div>
  );
}