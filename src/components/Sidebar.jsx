import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaRobot,
  FaBuilding,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {
  const role =
    localStorage.getItem("role") || "guest";

  return (
    <div className="w-72 bg-black border-r border-slate-800 min-h-screen">

      <div className="p-8">

        <h1 className="text-5xl font-bold text-cyan-400">
          FixIt.ai
        </h1>

      </div>

      <nav className="mt-8 flex flex-col gap-3 px-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-4 rounded-xl text-xl ${
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
              to="/company"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-4 rounded-xl text-xl ${
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