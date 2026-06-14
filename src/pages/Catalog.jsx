import { useState } from "react";

// Expanded mock data simulating a future backend response
const initialProducts = [
  {
    id: 1,
    name: "VoltRide S3 Electric Scooter",
    company: "VoltRide Mobility",
    category: "Scooters",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
    description: "Premium commuter electric scooter with intelligent battery monitoring.",
    details: {
      atRisk: [
        { name: "Charging Port", warning: "Critical Seals & Contact Pins (Frequent use can degrade).", icon: "🔌" },
        { name: "Suspension Fork", warning: "Internal Seals (Prone to wear & leaks).", icon: "🪫" },
        { name: "Throttle Sensor", warning: "Potentiometer Assembly (Susceptible to power fluctuations).", icon: "🕹️" }
      ],
      issues: [
        { name: "Range Decline", desc: "Multiple reports of reduced distance per charge over time.", icon: "📉" },
        { name: "Inconsistent Charging", desc: "Fluctuating charge speed or unexpected disconnects.", icon: "⚡" },
        { name: "Suspension Noise", desc: "Creaks and clicks reported over bumps.", icon: "🔊" }
      ],
      community: { users: 387, total: "15,480" }
    }
  },
  {
    id: 2,
    name: "AeroBreeze Smart AC",
    company: "AeroBreeze HVAC",
    category: "Air Conditioners",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800",
    description: "Smart inverter AC with WiFi control and predictive maintenance.",
    details: {
      atRisk: [
        { name: "Compressor Relay", warning: "High load component (Subject to voltage spikes).", icon: "⚡" },
        { name: "Air Filter Assembly", warning: "Dust accumulation reduces efficiency rapidly.", icon: "💨" },
        { name: "Coolant Line", warning: "Micro-fractures reported near the main valve.", icon: "❄️" }
      ],
      issues: [
        { name: "Weak Cooling", desc: "Takes longer than normal to reach target temperature.", icon: "🌡️" },
        { name: "Noisy Fan Motor", desc: "Rattling sound when operating at high fan speeds.", icon: "🔊" },
        { name: "WiFi Disconnects", desc: "Smart app loses connection to the unit frequently.", icon: "📶" }
      ],
      community: { users: 124, total: "8,200" }
    }
  },
  {
    id: 3,
    name: "AquaPure H2O Purifier",
    company: "AquaPure Solutions",
    category: "Water Purifiers",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800",
    description: "RO + UV water purifier with automatic health monitoring.",
    details: {
      atRisk: [
        { name: "RO Membrane", warning: "Clogging expected if TDS input exceeds 1500ppm.", icon: "💧" },
        { name: "UV Lamp", warning: "Intensity degrades after 8,000 hours of use.", icon: "💡" },
        { name: "Booster Pump", warning: "Diaphragm wear causes pressure drops over time.", icon: "⚙️" }
      ],
      issues: [
        { name: "Slow Flow Rate", desc: "Water dispensing takes twice as long as expected.", icon: "⏱️" },
        { name: "Taste Change", desc: "Slight metallic taste reported by users in high TDS areas.", icon: "👅" },
        { name: "Leaking Base", desc: "Minor pooling of water near the inlet valve connection.", icon: "💦" }
      ],
      community: { users: 89, total: "5,100" }
    }
  },
];

export default function Catalog() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Function to handle deletion (removes from UI now, wire to backend later)
  const handleDelete = (productId) => {
    // Prevent event bubbling if necessary, then update local state
    setProducts(products.filter(product => product.id !== productId));
  };

  // === DETAIL VIEW RENDER ===
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white p-8 font-sans overflow-y-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
            <p className="text-cyan-400">{selectedProduct.company}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Image Only */}
          <div className="bg-[#151D2C] border border-slate-800 rounded-2xl overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>

          {/* Right Column: Diagnostic Data */}
          <div className="space-y-6">
            
            {/* At-Risk Components Card */}
            <div className="bg-[#151D2C] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-cyan-400 font-bold uppercase tracking-wider mb-4 text-sm">At-Risk Components</h3>
              <div className="space-y-4">
                {selectedProduct.details.atRisk.map((risk, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="text-2xl">{risk.icon}</div>
                    <div>
                      <h4 className="font-bold text-white">{risk.name}</h4>
                      <p className="text-slate-400 text-sm mt-1">
                        <span className="text-yellow-500 font-bold">⚠️</span> {risk.warning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common User Issues Card */}
            <div className="bg-[#151D2C] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-yellow-500 font-bold uppercase tracking-wider mb-4 text-sm">Common User Issues</h3>
              <div className="space-y-4">
                {selectedProduct.details.issues.map((issue, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="text-2xl">{issue.icon}</div>
                    <div>
                      <h4 className="font-bold text-white">{issue.name}</h4>
                      <p className="text-slate-400 text-sm mt-1">{issue.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Report Card */}
            <div className="bg-[#151D2C] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-cyan-400 font-bold uppercase tracking-wider mb-4 text-sm">Community Report</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-extrabold text-cyan-400">{selectedProduct.details.community.users}</span>
                <span className="text-xl font-bold text-cyan-400">Users</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">Reported issues with this product.</p>
              <p className="text-slate-500 text-sm border-t border-slate-800 pt-4">
                Total {selectedProduct.name} Units Registered: <br/>
                <span className="text-white font-bold text-lg">{selectedProduct.details.community.total}</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // === CATALOG VIEW RENDER ===
  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8 font-sans">
      {/* Header */}
      <h1 className="text-5xl font-bold mb-2">
        Product Catalog
      </h1>
      <p className="text-slate-400 mb-8">
        Browse support material, manuals and diagnostics.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#151D2C] border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
        />
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#151D2C] rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400 transition duration-300 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6 flex flex-col flex-1">
              <div className="flex-1">
                <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>

                <h2 className="text-2xl font-bold mt-4">
                  {product.name}
                </h2>

                <p className="text-cyan-400 mt-2">
                  {product.company}
                </p>

                <p className="text-slate-400 mt-4 h-12">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-lg transition-colors"
                >
                  View Details
                </button>

                <button 
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  title="Delete Product"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}