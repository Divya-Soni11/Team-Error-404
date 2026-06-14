import { useState, useRef } from "react";

export default function CompanyPortal() {
  // States for Add Product
  const [addProductName, setAddProductName] = useState("");
  const [addCompanyName, setAddCompanyName] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addManual, setAddManual] = useState(null);

  // States for Update Product
  const [updateTargetProduct, setUpdateTargetProduct] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateCompanyName, setUpdateCompanyName] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateManual, setUpdateManual] = useState(null);

  // Refs for File Inputs
  const addFileInputRef = useRef(null);
  const updateFileInputRef = useRef(null);

  const handlePublish = () => {
    alert("Product Published Successfully!");
  };

  const handleUpdate = () => {
    alert("Product Updated Successfully!");
  };

  // File Selection Handlers
  const handleAddFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAddManual(e.target.files[0]);
    }
  };

  const handleUpdateFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUpdateManual(e.target.files[0]);
    }
  };

  // Handle Logout inside the full-screen portal
  const handleLogout = () => {
    localStorage.removeItem("role"); // Clear the company role
    window.location.href = "/"; // Force reload to dashboard
  };

  // Handle navigation back to the app
  const goBackToCatalog = () => {
    window.location.href = "/catalog";
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8 font-sans">

      {/* Header with Navigation and Logout */}
      <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-5xl font-bold">
            Company Portal
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Add products, update details, upload manuals and publish AI-ready support content.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={goBackToCatalog}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <span>View Catalog</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">

          {/* 1. Add New Product Form */}
          <div className="bg-[#151D2C] rounded-2xl border border-slate-800 p-6">
            <h2 className="text-2xl font-bold mb-6">
              Add New Product
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-slate-300">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={addProductName}
                  onChange={(e) => setAddProductName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={addCompanyName}
                  onChange={(e) => setAddCompanyName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Category</label>
                <select
                  value={addCategory}
                  onChange={(e) => setAddCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                >
                  <option value="">Select Category</option>
                  <option value="scooter">Electric Scooter</option>
                  <option value="ac">Air Conditioner</option>
                  <option value="purifier">Water Purifier</option>
                  <option value="washing-machine">Washing Machine</option>
                  <option value="electronics">Consumer Electronics</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Product Description</label>
                <textarea
                  rows="4"
                  placeholder="Describe product features..."
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                />
              </div>

              {/* Upload Manual inside Add Form */}
              <div className="mt-4">
                <label className="block mb-2 text-slate-300">Upload Product Manual</label>
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center bg-slate-800/30">
                  <div className="text-4xl mb-3">📄</div>
                  <h3 className="text-lg font-semibold">Drag & Drop PDF Manual</h3>
                  <p className="text-slate-400 text-sm mt-1">Upload manuals for AI troubleshooting and maintenance extraction.</p>
                  
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={addFileInputRef}
                    onChange={handleAddFileChange}
                    className="hidden"
                  />

                  <button
                    onClick={() => addFileInputRef.current.click()}
                    className="mt-4 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg transition-colors"
                  >
                    Browse File
                  </button>

                  {/* Display Selected File Name */}
                  {addManual && (
                    <p className="mt-3 text-cyan-400 font-medium text-sm">
                      Selected: {addManual.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handlePublish}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors mt-2"
              >
                Publish Product
              </button>
            </div>
          </div>


          {/* 2. Update Existing Product Form */}
          <div className="bg-[#151D2C] rounded-2xl border border-slate-800 p-6">
            <h2 className="text-2xl font-bold mb-6">
              Update Existing Product
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-slate-300">Select Product to Update</label>
                <select
                  value={updateTargetProduct}
                  onChange={(e) => setUpdateTargetProduct(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                >
                  <option value="">-- Choose a product --</option>
                  <option value="prod1">VoltRide S3 Electric Scooter</option>
                  <option value="prod2">AeroBreeze Smart AC</option>
                  <option value="prod3">AquaPure H2O Purifier</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Update Product Name</label>
                <input
                  type="text"
                  placeholder="Enter updated product name"
                  value={updateProductName}
                  onChange={(e) => setUpdateProductName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Update Company Name</label>
                <input
                  type="text"
                  placeholder="Enter updated company name"
                  value={updateCompanyName}
                  onChange={(e) => setUpdateCompanyName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Update Category</label>
                <select
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                >
                  <option value="">Select Category</option>
                  <option value="scooter">Electric Scooter</option>
                  <option value="ac">Air Conditioner</option>
                  <option value="purifier">Water Purifier</option>
                  <option value="washing-machine">Washing Machine</option>
                  <option value="electronics">Consumer Electronics</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Update Product Description</label>
                <textarea
                  rows="4"
                  placeholder="Update product features..."
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
                />
              </div>

              {/* Upload Manual inside Update Form */}
              <div className="mt-4">
                <label className="block mb-2 text-slate-300">Upload Updated Product Manual</label>
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center bg-slate-800/30">
                  <div className="text-4xl mb-3">📄</div>
                  <h3 className="text-lg font-semibold">Drag & Drop PDF Manual</h3>
                  <p className="text-slate-400 text-sm mt-1">Upload a new version of the manual to update AI knowledge base.</p>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={updateFileInputRef}
                    onChange={handleUpdateFileChange}
                    className="hidden"
                  />

                  <button
                    onClick={() => updateFileInputRef.current.click()}
                    className="mt-4 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg transition-colors"
                  >
                    Browse File
                  </button>

                  {/* Display Selected File Name */}
                  {updateManual && (
                    <p className="mt-3 text-cyan-400 font-medium text-sm">
                      Selected: {updateManual.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleUpdate}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors mt-2"
              >
                Update Product
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Stats Panel */}
        <div className="space-y-6">

          <div className="bg-[#151D2C] rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">Products Published</h3>
            <p className="text-5xl font-bold text-cyan-500 mt-4">124</p>
          </div>

          <div className="bg-[#151D2C] rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">AI Manuals Processed</h3>
            <p className="text-5xl font-bold text-green-500 mt-4">89</p>
          </div>

          <div className="bg-[#151D2C] rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold">Active Users</h3>
            <p className="text-5xl font-bold text-purple-500 mt-4">1.2K</p>
          </div>

        </div>

      </div>

    </div>
  );
}