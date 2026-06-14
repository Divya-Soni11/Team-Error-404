import { useState } from "react";

const products = [
  {
    id: 1,
    name: "VoltRide S3 Electric Scooter",
    company: "VoltRide Mobility",
    category: "Scooters",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
    description:
      "Premium commuter electric scooter with intelligent battery monitoring.",
    registered: true,
  },
  {
    id: 2,
    name: "AeroBreeze Smart AC",
    company: "AeroBreeze HVAC",
    category: "Air Conditioners",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800",
    description:
      "Smart inverter AC with WiFi control and predictive maintenance.",
    registered: false,
  },
  {
    id: 3,
    name: "AquaPure H2O Purifier",
    company: "AquaPure Solutions",
    category: "Water Purifiers",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800",
    description:
      "RO + UV water purifier with automatic health monitoring.",
    registered: true,
  },
];

export default function Catalog() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
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
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
        />
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400 transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>

              <h2 className="text-2xl font-bold mt-4">
                {product.name}
              </h2>

              <p className="text-cyan-400 mt-2">
                {product.company}
              </p>

              <p className="text-slate-400 mt-4">
                {product.description}
              </p>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg">
                  View Details
                </button>

                {product.registered ? (
                  <button className="bg-green-600 px-4 rounded-lg">
                    Registered
                  </button>
                ) : (
                  <button className="bg-slate-700 px-4 rounded-lg">
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}