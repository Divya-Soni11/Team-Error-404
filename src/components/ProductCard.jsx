import {
  FaBatteryFull,
  FaTools,
  FaArrowRight,
} from "react-icons/fa";

export default function ProductCard({
  name,
  company,
  category,
  health,
  image,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500 transition duration-300 hover:scale-[1.02]">

      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex justify-between items-center mb-3">

          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
            {category}
          </span>

          <span
            className={`text-sm font-semibold ${
              health >= 90
                ? "text-green-400"
                : health >= 70
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {health}% Health
          </span>

        </div>

        <h2 className="text-xl font-bold text-white">
          {name}
        </h2>

        <p className="text-slate-400 mt-1">
          {company}
        </p>

        {/* Health Bar */}
        <div className="mt-4">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">
              Device Health
            </span>

            <span className="text-white">
              {health}%
            </span>
          </div>

          <div className="bg-slate-800 rounded-full h-3 overflow-hidden">

            <div
              className={`h-full ${
                health >= 90
                  ? "bg-green-500"
                  : health >= 70
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${health}%`,
              }}
            />

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">

          <div className="bg-slate-800 rounded-xl p-3 text-center">

            <FaBatteryFull
              className="mx-auto text-green-400 mb-2"
              size={20}
            />

            <p className="text-sm text-slate-400">
              Battery
            </p>

            <p className="font-semibold text-white">
              Good
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-3 text-center">

            <FaTools
              className="mx-auto text-cyan-400 mb-2"
              size={20}
            />

            <p className="text-sm text-slate-400">
              Service
            </p>

            <p className="font-semibold text-white">
              Due Soon
            </p>

          </div>

        </div>

        {/* Action Button */}
        <button className="w-full mt-5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2">

          View Details

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
}