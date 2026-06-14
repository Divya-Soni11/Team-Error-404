import { FaCheckCircle, FaClock, FaTools } from "react-icons/fa";

export default function MaintenanceList() {
  const maintenanceTasks = [
    {
      id: 1,
      title: "Battery Health Check",
      status: "Completed",
      date: "12 Jun 2026",
      icon: <FaCheckCircle />,
      color: "text-green-400",
    },
    {
      id: 2,
      title: "Motor Inspection",
      status: "Pending",
      date: "18 Jun 2026",
      icon: <FaClock />,
      color: "text-yellow-400",
    },
    {
      id: 3,
      title: "Filter Replacement",
      status: "Scheduled",
      date: "25 Jun 2026",
      icon: <FaTools />,
      color: "text-cyan-400",
    },
    {
      id: 4,
      title: "Brake System Check",
      status: "Pending",
      date: "30 Jun 2026",
      icon: <FaClock />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Maintenance Schedule
        </h2>

        <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
          4 Tasks
        </span>

      </div>

      {/* Timeline */}
      <div className="space-y-4">

        {maintenanceTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition"
          >

            <div className={`text-2xl ${task.color}`}>
              {task.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-white">
                {task.title}
              </h3>

              <p className="text-slate-400 text-sm">
                Due Date: {task.date}
              </p>

            </div>

            <div
              className={`px-3 py-1 rounded-full text-sm ${
                task.status === "Completed"
                  ? "bg-green-500/20 text-green-400"
                  : task.status === "Pending"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-cyan-500/20 text-cyan-400"
              }`}
            >
              {task.status}
            </div>

          </div>
        ))}

      </div>

      {/* Bottom Summary */}
      <div className="mt-6 bg-slate-800 rounded-xl p-4">

        <h3 className="font-semibold text-white mb-2">
          Upcoming Service
        </h3>

        <p className="text-slate-400">
          Next scheduled maintenance:
          <span className="text-cyan-400 font-semibold ml-2">
            Motor Inspection
          </span>
        </p>

      </div>

    </div>
  );
}