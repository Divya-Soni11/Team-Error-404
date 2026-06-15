import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaBuilding, 
  FaTag, 
  FaFileAlt, 
  FaExternalLinkAlt, 
  FaFilePdf, 
  FaImage 
} from "react-icons/fa";
import API from "../data/api.js"; // Central Axios Client

export default function ProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [companyName, setCompanyName] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetailedProduct = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/company/view-product/${id}`); 
        setProduct(response.data.product);
        setCompanyName(response.data.companyName || " ");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to parse product specifications schema.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetailedProduct();
  }, [id]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 font-bold text-xl animate-pulse">
          Decrypting device configuration manifests...
        </div>
      </div>
    );
  }

  // Error Alert Fallback Panel
  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 max-w-xl rounded-2xl p-6 text-center">
          <h2 className="text-red-400 font-bold text-2xl mb-2">Detailed View Route Halted</h2>
          <p className="text-slate-400 text-sm mb-6">{error || "Asset lookup query returned an empty index record layer."}</p>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-semibold hover:border-slate-700 mx-auto"
          >
            <FaArrowLeft size={12} /> Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // 🌟 FIXED: Target nested schema keys safely using optional chaining
  const rawLinks = product.supportingDocs?.externalLinks || [];
  const rawManuals = product.supportingDocs?.manuals || [];

  // Helper logic to parse external links array safely if stored as stringified data
  let parsedExternalLinks = [];
  if (Array.isArray(rawLinks)) {
    parsedExternalLinks = rawLinks;
  } else if (typeof rawLinks === "string" && rawLinks.trim()) {
    try {
      parsedExternalLinks = JSON.parse(rawLinks);
    } catch (e) {
      parsedExternalLinks = rawLinks.split(",").map(l => l.trim()).filter(Boolean);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      
      {/* Back Navigation Bar */}
      <button
        onClick={() => navigate(-1)} 
        className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors font-medium mb-8 group"
      >
        <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Product Deck</span>
      </button>

      {/* Main Double Grid Split Layout */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
        {/* Left Aspect: Display Showcase Canvas */}
        <div className="rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/40 p-4 h-fit backdrop-blur-md">
          <div className="h-[400px] rounded-2xl overflow-hidden bg-slate-800">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Aspect: Metadata Parameter breakdown */}
        <div className="flex flex-col justify-between">
          <div>
            
            {/* Identity Header tags rows */}
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                <FaTag size={10} /> {product.category || "General Spec"}
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: {product._id}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
              {product.name}
            </h1>

            {/* Corporate Label Block */}
            <div className="flex items-center gap-2 text-slate-400 font-medium text-lg mb-6">
              <FaBuilding className="text-purple-400 text-sm" />
              <span>{companyName || product.company?.name || "Corporate Fleet Asset"}</span>
            </div>

            {/* Parameter Specification Block */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
              <h3 className="text-slate-200 font-bold text-lg mb-3 flex items-center gap-2">
                <FaFileAlt className="text-cyan-400 text-sm" /> Technical Specifications
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                {product.description || "No supplemental logs listed for this layout."}
              </p>
            </div>

            {/* 🌟 CONNECTED MEDIA & RESOURCES PANEL */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-slate-200 font-bold text-lg border-b border-slate-800 pb-2">
                Connected Media & Resources
              </h3>

              {/* 🌟 FIXED: Map over manuals array directly from supportingDocs.manuals */}
              {rawManuals.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Technical Manuals ({rawManuals.length})
                  </span>
                  <div className="space-y-2">
                    {rawManuals.map((manualUrl, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-3 min-w-0">
                          <FaFilePdf className="text-red-400 flex-shrink-0" size={18} />
                          <span className="text-sm font-medium text-slate-300 truncate">
                            {manualUrl.split("/").pop() || `Product Manual ${idx + 1}`}
                          </span>
                        </div>
                        <a
                          href={manualUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 whitespace-nowrap transition-colors"
                        >
                          View Document
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supplemental Gallery Images Deck */}
              {product.images && product.images.length > 1 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Additional Gallery Items
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {product.images.slice(1).map((imgUrl, idx) => (
                      <a
                        key={idx}
                        href={imgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-slate-800/30 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors text-xs text-slate-300"
                      >
                        <FaImage className="text-green-400 flex-shrink-0" />
                        <span className="truncate font-mono">Image_Attachment_{idx + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* External Ecosystem Reference Links */}
              {parsedExternalLinks.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    External Ecosystem Links
                  </span>
                  <div className="space-y-2">
                    {parsedExternalLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.startsWith("http") ? link : `https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800/80 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FaExternalLinkAlt className="text-purple-400 flex-shrink-0 text-xs" />
                          <span className="text-xs font-mono text-slate-300 truncate tracking-tight">
                            {link}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0">
                          Follow Link ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback Empty Placeholder */}
              {rawManuals.length === 0 && (!product.images || product.images.length <= 1) && parsedExternalLinks.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-2">
                  No reference links or document attachments linked to this asset profile.
                </p>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}