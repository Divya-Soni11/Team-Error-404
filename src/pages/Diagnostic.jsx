import { useState } from "react";

export default function Diagnostic() {
  const [message, setMessage] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Upload a product image or describe your issue. I'll help diagnose the problem.",
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
        "Analyzing issue... Please provide more details for accurate diagnostics.";
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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          AI Diagnostic Assistant
        </h1>

        <p className="text-slate-400 mt-2">
          Upload product images and receive AI-powered diagnostics.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Panel */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <h2 className="text-xl font-bold mb-4">
            Device Selection
          </h2>

          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option>Electric Scooter</option>
            <option>Air Conditioner</option>
            <option>Water Purifier</option>
            <option>Washing Machine</option>
          </select>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Common Issues
          </h2>

          <div className="space-y-3">

            <button
              onClick={() => setMessage("Battery problem")}
              className="w-full bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
            >
              Battery Problem
            </button>

            <button
              onClick={() => setMessage("Motor issue")}
              className="w-full bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
            >
              Motor Issue
            </button>

            <button
              onClick={() => setMessage("Water filter problem")}
              className="w-full bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
            >
              Water Filter Problem
            </button>

            <button
              onClick={() => setMessage("Device not starting")}
              className="w-full bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
            >
              Device Not Starting
            </button>

          </div>

          <div className="mt-8">

            <h2 className="text-xl font-bold mb-4">
              Diagnosis Confidence
            </h2>

            <div className="bg-slate-800 rounded-full h-4 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[85%]"></div>
            </div>

            <p className="mt-2 text-cyan-400">
              85% Confidence
            </p>

          </div>

        </div>

        {/* Chat Section */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[750px]">

          <div className="p-5 border-b border-slate-800">
            <h2 className="text-2xl font-bold">
              AI Troubleshooting Chat
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {/* Uploaded Image */}
            {imagePreview && (
              <div className="bg-slate-800 p-4 rounded-xl">

                <h3 className="text-cyan-400 mb-3">
                  Uploaded Product Image
                </h3>

                <img
                  src={imagePreview}
                  alt="Uploaded Product"
                  className="rounded-xl max-h-72"
                />

              </div>
            )}

            {/* AI Visual Inspection */}
            {imagePreview && (
              <div className="bg-slate-800 border border-cyan-500 rounded-xl p-5">

                <h3 className="text-xl font-bold text-cyan-400 mb-3">
                  AI Visual Inspection
                </h3>

                <ul className="space-y-2 text-slate-300">
                  <li>✅ Product Identified Successfully</li>
                  <li>⚠ Minor Surface Damage Detected</li>
                  <li>⚠ Battery Health Estimated: 82%</li>
                  <li>✅ Motor Housing Intact</li>
                  <li>🔧 Maintenance Recommended</li>
                </ul>

              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] p-4 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-cyan-500 text-black ml-auto"
                    : "bg-slate-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-800">

            <div className="flex gap-3 mb-3">

              <label className="bg-slate-700 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-600">

                Upload Image

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />

              </label>

              <button
                onClick={analyzeImage}
                className="bg-green-600 hover:bg-green-500 px-4 rounded-lg"
              >
                Analyze Image
              </button>

            </div>

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-800 rounded-lg px-4 py-3 outline-none"
              />

              <button
                onClick={sendMessage}
                className="bg-cyan-500 text-black font-semibold px-6 rounded-lg hover:bg-cyan-400"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold">
            Maintenance Due
          </h3>

          <p className="text-slate-400 mt-2">
            Next service in 15 days.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold">
            Health Score
          </h3>

          <p className="text-green-400 text-3xl mt-2">
            92%
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold">
            AI Suggestions
          </h3>

          <p className="text-slate-400 mt-2">
            Perform preventive maintenance to avoid future failures.
          </p>
        </div>

      </div>

    </div>
  );
}