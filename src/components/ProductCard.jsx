import { FaArrowRight } from "react-icons/fa";

export default function ProductCard({
  name,
  company,
  category,
  description, 
  image,
  onViewDetails,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500 transition duration-300 hover:scale-[1.02] flex flex-col justify-between h-full w-full">
      
      <div>
        {/* Product Image Frame */}
        <div className="h-48 overflow-hidden bg-slate-800">
          <img
            src={image || "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Core Description Text Blocks */}
        <div className="p-5">
          
          {/* Category Pill Tag */}
          <div className="flex mb-3">
            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
              {category || "General"}
            </span>
          </div>

          {/* Product Asset Identity */}
          <h2 className="text-xl font-bold text-white line-clamp-1">
            {name}
          </h2>

          {/* Business Owner Metadata */}
          <p className="text-slate-400 mt-0.5 text-sm">
            {company}
          </p>

          {/* 🌟 LIVE DATABASE DESCRIPTION PARAGRAPH */}
          <p className="text-slate-400 mt-4 text-sm leading-relaxed border-t border-slate-800/60 pt-4 line-clamp-4 min-h-[80px]">
            {description || "No specific design descriptions or internal configuration logs uploaded for this operational asset inventory model."}
          </p>

        </div>
      </div>

     {/* Action Footer Button */}
      <div className="px-5 pb-5">
        {/* 🌟 Attach click listener directly to trigger navigate stream instantly */}
        <button 
          onClick={onViewDetails} 
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.99] text-sm"
        >
          <span>View Details</span>
          <FaArrowRight size={12} />
        </button>
      </div>

    </div>
  );
}