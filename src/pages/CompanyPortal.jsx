import { useState } from "react";

export default function CompanyPortal() {
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");

  const handlePublish = () => {
    alert("Product Published Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Company Portal
        </h1>

        <p className="text-slate-400 mt-2">
          Add products, upload manuals and publish AI-ready support content.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Product Form */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Add New Product
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 text-slate-300">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Company Name
              </label>

              <input
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
              >
                <option>Select Category</option>
                <option>Electric Scooter</option>
                <option>Air Conditioner</option>
                <option>Water Purifier</option>
                <option>Washing Machine</option>
                <option>Consumer Electronics</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Product Description
              </label>

              <textarea
                rows="5"
                placeholder="Describe product features..."
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handlePublish}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl"
            >
              Publish Product
            </button>

          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">
              Products Published
            </h3>

            <p className="text-5xl font-bold text-cyan-400 mt-4">
              124
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">
              AI Manuals Processed
            </h3>

            <p className="text-5xl font-bold text-green-400 mt-4">
              89
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">
              Active Users
            </h3>

            <p className="text-5xl font-bold text-purple-400 mt-4">
              1.2K
            </p>
          </div>

        </div>

      </div>

      {/* Upload Section */}

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          Upload Product Manual
        </h2>

        <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center">

          <div className="text-5xl mb-4">
            📄
          </div>

          <h3 className="text-xl font-semibold">
            Drag & Drop PDF Manual
          </h3>

          <p className="text-slate-400 mt-2">
            Upload manuals for AI troubleshooting and maintenance extraction.
          </p>

          <button className="mt-5 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl">
            Browse File
          </button>

        </div>
      </div>

      {/* Maintenance Schedule */}

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          AI Extracted Maintenance Schedule
        </h2>

        <div className="space-y-4">

          <div className="bg-slate-800 p-4 rounded-xl flex justify-between">
            <span>Battery Inspection</span>
            <span className="text-cyan-400">Every 30 Days</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl flex justify-between">
            <span>Filter Replacement</span>
            <span className="text-green-400">Every 90 Days</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl flex justify-between">
            <span>Motor Checkup</span>
            <span className="text-yellow-400">Every 180 Days</span>
          </div>

        </div>
      </div>

    </div>
  );
}