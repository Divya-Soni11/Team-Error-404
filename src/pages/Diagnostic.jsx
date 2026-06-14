import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function Diagnostic() {
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Upload a product image or describe your issue. I'll act as your mechanic and help diagnose the problem.",
    },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const analyzeImage = () => {
    if (!imagePreview) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "AI Image Analysis Complete. Detected possible battery wear and minor external damage. Maintenance recommended within 15 days.",
      },
    ]);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    let aiResponse = "";

    if (message.toLowerCase().includes("battery")) {
      aiResponse =
        "Battery health appears low. Try charging fully, inspect charging cable and check battery diagnostics.";
    } else if (message.toLowerCase().includes("motor")) {
      aiResponse =
        "Motor issue detected. Check power supply, controller status and wiring connections.";
    } else if (message.toLowerCase().includes("water")) {
      aiResponse =
        "Please inspect filter status, inlet pressure and maintenance schedule.";
    } else if (
      message.toLowerCase().includes("start") ||
      message.toLowerCase().includes("power")
    ) {
      aiResponse =
        "Check power supply, fuse status and charging system. The issue may be related to battery failure.";
    } else {
      aiResponse =
        "Analyzing issue... Could you provide more specific details, such as any error codes or unusual sounds?";
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        sender: "ai",
        text: aiResponse,
      },
    ]);

    setMessage("");
  };

  // Handle Logout function (redirects to Dashboard)
  const handleLogout = () => {
    localStorage.removeItem("role"); // Clear the user/company role
    window.location.href = "/"; // Force reload to dashboard
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8 font-sans overflow-x-hidden">

      {/* Top Header Row with Search, Catalog Navigation & Logout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-800 pb-6">
        
        {/* Title Area */}
        <div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Diagnostic Assistant
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Upload product images and receive AI-powered mechanic-level diagnostics.
          </p>
        </div>

        {/* Controls Area */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search previous issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151D2C] border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
          </div>

          {/* Catalog Link Button */}
          <Link 
            to="/catalog.jsx"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            View Catalog
          </Link>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Panel - Selectors & Confidence Score */}
        <div className="bg-[#151D2C] rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col h-full">

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-cyan-400">⚙️</span> Device Selection
          </h2>

          <select className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 transition-colors">
            <option>VoltRide S3 Electric Scooter</option>
            <option>AeroBreeze Smart AC</option>
            <option>AquaPure H2O Purifier</option>
            <option>Washing Machine</option>
          </select>

          {/* Spacer to push the confidence bar to the bottom */}
          <div className="flex-1"></div>

          <div className="mt-8 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-3">
              Diagnosis Confidence
            </h2>
            <div className="bg-slate-800 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
            <p className="mt-2 text-cyan-400 font-bold text-right text-sm">
              85% Match
            </p>
          </div>

        </div>

        {/* Right Panel - Chat Section */}
        <div className="lg:col-span-2 bg-[#151D2C] rounded-2xl border border-slate-800 shadow-xl flex flex-col h-[750px] relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="p-6 border-b border-slate-800 bg-[#1A2333]/80 backdrop-blur-md z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xl shadow-lg">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold"> AI Diagnostic</h2>
              <p className="text-xs text-cyan-400">Mechanic-Level Assistant • Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scroll-smooth">

            {/* Uploaded Image Preview */}
            {imagePreview && (
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 max-w-[80%]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-cyan-400">📷</span>
                  <h3 className="font-semibold text-sm">Image Uploaded for Analysis</h3>
                </div>
                <img
                  src={imagePreview}
                  alt="Uploaded Product"
                  className="rounded-xl max-h-64 object-cover w-full border border-slate-700"
                />
              </div>
            )}

            {/* AI Visual Inspection Results */}
            {imagePreview && (
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_15px_rgba(34,211,238,0.05)] max-w-[85%]">
                <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                  <span>🔍</span> Visual Inspection Report
                </h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-center gap-2">✅ <span className="text-white">Product Identified:</span> VoltRide S3</li>
                  <li className="flex items-center gap-2">⚠ <span className="text-yellow-400">Minor Surface Damage Detected</span></li>
                  <li className="flex items-center gap-2">⚠ <span className="text-white">Battery Health Estimated:</span> 82%</li>
                  <li className="flex items-center gap-2">✅ <span className="text-white">Motor Housing Intact</span></li>
                  <li className="flex items-center gap-2 mt-3 pt-3 border-t border-cyan-500/20 text-cyan-400 font-semibold">
                    🔧 Maintenance Recommended within 15 days
                  </li>
                </ul>
              </div>
            )}

            {/* Chat Messages Map */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none shadow-lg"
                      : "bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none shadow-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-800 bg-[#1A2333]/80 backdrop-blur-md z-10">

            {/* Image Action Buttons */}
            <div className="flex gap-3 mb-4">
              <label className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full cursor-pointer hover:bg-slate-700 transition-colors text-sm font-medium text-slate-300">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>

              <button
                onClick={analyzeImage}
                disabled={!imagePreview}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  imagePreview 
                  ? "bg-green-600/20 text-green-400 border border-green-500/50 hover:bg-green-600/30" 
                  : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                }`}
              >
                <span>🧠</span> Run AI Analysis
              </button>
            </div>

            {/* Text Input Block */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Describe your issue or ask a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 transition-colors text-white shadow-inner"
              />
              <button
                onClick={sendMessage}
                className="bg-cyan-500 text-slate-900 font-bold px-8 rounded-xl hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                Send
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Information Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        
        <div className="bg-[#151D2C] p-6 rounded-2xl border border-slate-800 flex items-center gap-5 hover:border-slate-600 transition-colors">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-2xl text-red-500">
            📅
          </div>
          <div>
            <h3 className="text-sm text-slate-400 uppercase tracking-wider font-bold">Maintenance Due</h3>
            <p className="text-white font-semibold mt-1">Next service in 15 days.</p>
          </div>
        </div>

        <div className="bg-[#151D2C] p-6 rounded-2xl border border-slate-800 flex items-center gap-5 hover:border-slate-600 transition-colors">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-2xl text-green-500">
            ❤️
          </div>
          <div>
            <h3 className="text-sm text-slate-400 uppercase tracking-wider font-bold">Health Score</h3>
            <p className="text-green-400 text-2xl font-bold mt-1">92%</p>
          </div>
        </div>

        <div className="bg-[#151D2C] p-6 rounded-2xl border border-slate-800 flex items-center gap-5 hover:border-slate-600 transition-colors">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-2xl text-purple-500">
            💡
          </div>
          <div>
            <h3 className="text-sm text-slate-400 uppercase tracking-wider font-bold">AI Suggestions</h3>
            <p className="text-slate-300 text-sm mt-1">Perform preventive maintenance to avoid future failures.</p>
          </div>
        </div>

      </div>

    </div>
  );
}