import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const maintenanceData = [
  { month: "Jan", tasks: 12 },
  { month: "Feb", tasks: 19 },
  { month: "Mar", tasks: 15 },
  { month: "Apr", tasks: 28 },
  { month: "May", tasks: 22 },
  { month: "Jun", tasks: 35 },
];

const healthData = [
  { device: "Scooter", score: 92 },
  { device: "AC", score: 85 },
  { device: "Purifier", score: 88 },
  { device: "Washer", score: 78 },
];

export default function Charts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Maintenance Trend */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <h2 className="text-2xl font-bold mb-6 text-white">
          Maintenance Trends
        </h2>

        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis dataKey="month" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#06b6d4"
                strokeWidth={3}
              />
            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Product Health */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <h2 className="text-2xl font-bold mb-6 text-white">
          Product Health Score
        </h2>

        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={healthData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis dataKey="device" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Bar
                dataKey="score"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}