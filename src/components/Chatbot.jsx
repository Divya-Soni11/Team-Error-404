import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

export default function ChatBot() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am FixIt AI. How can I help you today?",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    let botReply = "Analyzing your issue...";

    if (input.toLowerCase().includes("battery")) {
      botReply =
        "Battery issue detected. Please check charging status and battery health.";
    } else if (input.toLowerCase().includes("motor")) {
      botReply =
        "Motor diagnostics suggest checking controller connections and power supply.";
    } else if (input.toLowerCase().includes("filter")) {
      botReply =
        "Filter maintenance may be required. Please inspect and replace if necessary.";
    } else if (input.toLowerCase().includes("service")) {
      botReply =
        "Your next scheduled maintenance is due in 15 days.";
    }

    const botMessage = {
      sender: "bot",
      text: botReply,
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[600px]">

      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">

        <div className="bg-cyan-500 p-3 rounded-full">
          <FaRobot className="text-black text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            FixIt AI Assistant
          </h2>

          <p className="text-green-400 text-sm">
            Online
          </p>
        </div>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-black"
                  : "bg-slate-800 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className="border-t border-slate-800 p-4">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Describe your issue..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-cyan-500"
          />

          <button
            onClick={handleSend}
            className="bg-cyan-500 hover:bg-cyan-400 px-5 rounded-xl flex items-center justify-center"
          >
            <FaPaperPlane className="text-black" />
          </button>

        </div>

      </div>

    </div>
  );
}