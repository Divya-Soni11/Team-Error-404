import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaBuilding,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const [showLoginMenu, setShowLoginMenu] =
    useState(false);

  return (
    <div className="h-24 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-10">

      {/* LEFT */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          FixIt AI Dashboard
        </h1>

        <p className="text-slate-400">
          Product Support & Maintenance Platform
        </p>
      </div>

      {/* CENTER SEARCH */}

      <div className="hidden md:flex items-center bg-slate-800 rounded-2xl px-5 py-4 w-[500px]">

        <FaSearch className="text-slate-400 text-xl" />

        <input
          type="text"
          placeholder="Search products, manuals, issues..."
          className="
            bg-transparent
            ml-4
            text-white
            outline-none
            w-full
          "
        />

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-8">

        {/* Notification */}

        <div className="relative">

          <FaBell className="text-white text-2xl cursor-pointer" />

          <div
            className="
              absolute
              -top-3
              -right-3
              w-6
              h-6
              bg-red-500
              rounded-full
              flex
              items-center
              justify-center
              text-xs
              text-white
            "
          >
            3
          </div>

        </div>

        {/* LOGIN DROPDOWN */}

        <div className="relative">

          <button
            onClick={() =>
              setShowLoginMenu(!showLoginMenu)
            }
            className="
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-bold
              px-6
              py-3
              rounded-xl
              flex
              items-center
              gap-3
              transition
            "
          >
            Login
            <FaChevronDown />
          </button>

          {showLoginMenu && (

            <div
              className="
                absolute
                right-0
                mt-3
                w-64
                bg-slate-900
                border
                border-slate-700
                rounded-2xl
                overflow-hidden
                shadow-2xl
                z-50
              "
            >

              <Link
                to="/login"
                onClick={() =>
                  setShowLoginMenu(false)
                }
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-white
                  hover:bg-slate-800
                  transition
                "
              >
                <FaBuilding className="text-cyan-400" />
                Company Login
              </Link>

              <Link
                to="/user-login"
                onClick={() =>
                  setShowLoginMenu(false)
                }
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-white
                  hover:bg-slate-800
                  transition
                "
              >
                <FaUser className="text-green-400" />
                User Login
              </Link>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}