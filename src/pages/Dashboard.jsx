import React from "react";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B1120] p-8 font-sans overflow-x-hidden">
      
      {/* Injecting Custom Keyframes for Smooth Entrance Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
        `}
      </style>

      {/* Top Header Row */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-white">
          Platform Overview
        </h1>
        <p className="text-slate-400 mt-2">
          Intelligent Product Support & Mechanic-Level Diagnostic Platform
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in-up delay-100">
        <div className="bg-[#151D2C] border border-slate-800 rounded-2xl p-8 shadow-lg hover:border-cyan-500/30 transition-colors duration-300">
           <p className="text-slate-400 mb-2 font-medium tracking-wide uppercase text-sm">Products in Marketplace</p>
           <p className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
             1,248
           </p>
        </div>
        <div className="bg-[#151D2C] border border-slate-800 rounded-2xl p-8 shadow-lg hover:border-cyan-500/30 transition-colors duration-300">
           <p className="text-slate-400 mb-2 font-medium tracking-wide uppercase text-sm">Successful AI Diagnoses</p>
           <p className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
             3,412
           </p>
        </div>
      </div>

      {/* Custom Hero / Vision Section */}
      <div className="relative bg-[#111827] border border-slate-800 rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl overflow-hidden animate-fade-in-up delay-200">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 z-10 tracking-tight">
          The information already exists.
        </h2>
        <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 z-10 pb-2">
          The problem is access.
        </h3>
        <p className="text-slate-300 max-w-3xl text-xl mb-10 z-10 leading-relaxed">
          Manuals are lengthy and scattered. We are replacing static search with a mechanic-level AI assistant that diagnoses issues through active investigation and elimination, built directly on official manufacturer documentation.
        </p>

        <div className="w-full z-10">
          <h4 className="text-3xl font-bold text-white mb-3">
            The Platform Architecture
          </h4>
          <p className="text-slate-400 mb-10 text-lg">
            A comprehensive ecosystem bridging the gap between manufacturers and end-users.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            
            {/* Card 1: Marketplace */}
            <div className="group bg-[#1A2333] border border-slate-700 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] hover:border-cyan-500/50 transition-all duration-500 cursor-default">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                🏪
              </div>
              <h5 className="text-white text-xl font-bold mb-3">1. Product Marketplace</h5>
              <p className="text-slate-400 text-sm leading-relaxed">
                A browsable catalog where companies register products and users find official listings, track ownership, and manage maintenance schedules in one place.
              </p>
            </div>

            {/* Card 2: Knowledge Repository */}
            <div className="group bg-[#1A2333] border border-slate-700 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] hover:border-cyan-500/50 transition-all duration-500 cursor-default">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                📚
              </div>
              <h5 className="text-white text-xl font-bold mb-3">2. Knowledge Repository</h5>
              <p className="text-slate-400 text-sm leading-relaxed">
                Companies upload PDFs, service docs, and videos. Our engine seamlessly ingests these materials, transforming static text into a deep, product-specific knowledge base.
              </p>
            </div>

            {/* Card 3: Diagnostic Assistant */}
            <div className="group bg-[#1A2333] border border-slate-700 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] hover:border-cyan-500/50 transition-all duration-500 cursor-default">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                🛠️
              </div>
              <h5 className="text-white text-xl font-bold mb-3">3. Intelligent Assistant</h5>
              <p className="text-slate-400 text-sm leading-relaxed">
                Not a simple chatbot. The assistant behaves like an experienced technician, asking follow-up questions to eliminate unlikely causes and trace the exact root issue.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}