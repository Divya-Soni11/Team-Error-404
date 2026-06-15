import { useState } from "react";
import API from "../data/api.js"; // Central Axios Client

export default function CompanyPortal() {
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // 🌟 Added State for Image Input Link
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePublish = async () => {
    setError("");
    setSuccess("");

    // Simple Form Validation
    if (!productName || !category || !description) {
      setError("Please complete all required fields (Name, Category, Description).");
      return;
    }

    setLoading(true);

    try {
      // 🌟 Fires your dynamic addProduct backend endpoint controller
      const response = await API.post("/company/add-product", {
        name: productName,
        category: category,
        description: description,
        // Passes the link inside an image array wrapper to fit your backend Mongoose model expectations
        images: imageUrl ? [imageUrl] : [], 
        companyName: companyName // Optional metadata property
      });

      setSuccess(response.data.message || "Product published successfully!");
      
      // Clear Form state logs upon successful compilation
      setProductName("");
      setCompanyName("");
      setCategory("");
      setDescription("");
      setImageUrl("");
    } catch (err) {
      setError(err.response?.data?.message || "Internal server error while publishing asset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">Company Portal</h1>
        <p className="text-slate-400 mt-2">
          Add products, upload manuals and publish AI-ready support content.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Product Form */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

          {/* Dynamic Banner Messaging Systems */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500 p-4 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 bg-green-500/10 border border-green-500 p-4 rounded-xl text-green-400 text-sm">
              {success}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-slate-300">Product Name *</label>
              <input
                type="text"
                placeholder="Enter product name (e.g., Galaxy A57 5G)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Company Name (Optional)</label>
              <input
                type="text"
                placeholder="Enter company name override"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white disabled:opacity-50"
              >
                <option value="">Select Category</option>
                <option value="Mobile Phone">Mobile Phone</option>
                <option value="Air Conditioner">Air Conditioner</option>
                <option value="Water Purifier">Water Purifier</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Consumer Electronics">Consumer Electronics</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Product Description *</label>
              <textarea
                rows="5"
                placeholder="Describe structural technical specifications, model attributes, and features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 text-white disabled:opacity-50"
              />
            </div>

            {/* 🌟 NEW: Product Showcase Image URL Link Input Field */}
            <div>
              <label className="block mb-2 text-slate-300">Product Image Link / URL</label>
              <input
                type="url"
                placeholder="Paste display image address (https://images.unsplash.com/...)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 text-cyan-400 font-mono text-sm disabled:opacity-50"
              />
            </div>

            <button
              onClick={handlePublish}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Publishing Model..." : "Publish Product"}
            </button>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">Products Published</h3>
            <p className="text-5xl font-bold text-cyan-400 mt-4">124</p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">AI Manuals Processed</h3>
            <p className="text-5xl font-bold text-green-400 mt-4">89</p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">Active Users</h3>
            <p className="text-5xl font-bold text-purple-400 mt-4">1.2K</p>
          </div>
        </div>

      </div>

      {/* Manual Upload Section */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Upload Product Manual</h2>
        <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-xl font-semibold">Drag & Drop PDF Manual</h3>
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
        <h2 className="text-2xl font-bold mb-6">AI Extracted Maintenance Schedule</h2>
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