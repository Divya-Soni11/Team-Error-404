import { useState } from "react";
import API from "../data/api.js"; // Central Axios Client

export default function CompanyPortal() {
  // Core Product States
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [externalLinks, setExternalLinks] = useState(""); 
  
  // File Binary Upload States (Matched to your backend layout collections)
  const [productImageFile, setProductImageFile] = useState(null);
  const [manualDocumentFile, setManualDocumentFile] = useState(null);

  // Status Trackers
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePublish = async () => {
    setError("");
    setSuccess("");

    // Front-end Validation Guard
    if (!productName || !category || !description) {
      setError("Please complete all required fields (Name, Category, Description).");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      
      // Append core text values exactly how your backend destructured req.body
      formData.append("name", productName);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("externalLinks", externalLinks); // Handled safely by your backend string splitter!

      // 🌟 FIXED: The field keys here now match your backend req.files['images'] and ['manuals'] exactly!
      if (productImageFile) {
        formData.append("images", productImageFile); 
      }
      if (manualDocumentFile) {
        formData.append("manuals", manualDocumentFile); 
      }

      // Issue POST request using multipart streaming headers
      const response = await API.post("/company/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message || "Product published completely with attached documents!");
      
      // Reset Form State parameters on success
      setProductName("");
      setCategory("");
      setDescription("");
      setExternalLinks("");
      setProductImageFile(null);
      setManualDocumentFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Internal server exception uploading multipart bundle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8 font-sans">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">Company Portal</h1>
        <p className="text-slate-400 mt-2">
          Add assets, stream functional binary manuals, and publish infrastructure telemetry data models.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Product Submission Console Block */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Product Asset</h2>

          {error && <div className="mb-5 bg-red-500/10 border border-red-500 p-4 rounded-xl text-red-400 text-sm">{error}</div>}
          {success && <div className="mb-5 bg-green-500/10 border border-green-500 p-4 rounded-xl text-green-400 text-sm">{success}</div>}

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-slate-300">Product Name *</label>
              <input
                type="text"
                placeholder="e.g., Galaxy A57 5G"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                <option value="Television">Television</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Consumer Electronics">Consumer Electronics</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Product Description *</label>
              <textarea
                rows="4"
                placeholder="Outline asset architectural parameters..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 text-white disabled:opacity-50"
              />
            </div>

            {/* External Reference Links */}
            <div>
              <label className="block mb-2 text-slate-300">External Links (Comma Separated)</label>
              <input
                type="text"
                placeholder="https://example1.com, https://example2.com"
                value={externalLinks}
                onChange={(e) => setExternalLinks(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 text-cyan-400 font-mono text-sm disabled:opacity-50"
              />
            </div>

            {/* Image File Selector */}
            <div>
              <label className="block mb-2 text-slate-300">Upload Product Image File</label>
              <div className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductImageFile(e.target.files[0])}
                  disabled={loading}
                  className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer w-full"
                />
              </div>
              {productImageFile && <p className="text-xs text-cyan-400 mt-1.5 font-mono">Selected: {productImageFile.name}</p>}
            </div>

            {/* Manual Document Selector */}
            <div>
              <label className="block mb-2 text-slate-300">Upload Product Manual Document (PDF, Docx)</label>
              <div className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-3">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => setManualDocumentFile(e.target.files[0])}
                  disabled={loading}
                  className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer w-full"
                />
              </div>
              {manualDocumentFile && <p className="text-xs text-green-400 mt-1.5 font-mono">Selected Document: {manualDocumentFile.name}</p>}
            </div>

            <button
              onClick={handlePublish}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition disabled:opacity-50 mt-4"
            >
              {loading ? "Streaming Assets to Supabase..." : "Publish Product Assets"}
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}