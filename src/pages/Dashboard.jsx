import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import MaintenanceList from "../components/MaintenanceList";
import ChatBot from "../components/ChatBot";
import ProductCard from "../components/ProductCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          AI Powered Product Support & Maintenance Platform
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Registered Products"
          value="1,248"
        />

        <StatCard
          title="Pending Services"
          value="42"
        />

        <StatCard
          title="AI Diagnoses"
          value="3,412"
        />

        <StatCard
          title="Health Score"
          value="92%"
        />

      </div>

      {/* Charts */}

      <div className="mb-8">
        <Charts />
      </div>

      {/* Products + Maintenance */}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        {/* Products */}

        <div className="lg:col-span-2">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-white">
                Featured Products
              </h2>

              <button className="text-cyan-400">
                View All
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <ProductCard
                name="VoltRide S3"
                company="VoltRide Mobility"
                category="Scooter"
                health={92}
                image="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800"
              />

              <ProductCard
                name="AeroBreeze Smart AC"
                company="AeroBreeze"
                category="Air Conditioner"
                health={84}
                image="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800"
              />

            </div>

          </div>

        </div>

        {/* Maintenance */}

        <MaintenanceList />

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Chatbot */}

        <div className="lg:col-span-2">
          <ChatBot />
        </div>

        {/* Activity Feed */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                Battery Diagnostic Completed
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                VoltRide S3 · 5 mins ago
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                Maintenance Reminder Sent
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                AeroBreeze AC · 20 mins ago
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                New Product Registered
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                AquaPure RO · 1 hour ago
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                Manual Uploaded
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Washing Machine X · Today
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}