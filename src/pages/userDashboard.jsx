import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaintenanceList from "../components/MaintenanceList";
import ProductCard from "../components/ProductCard";
import API from "../data/api.js"; 

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [companyName, setCompanyName] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Pagination Configuration State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  useEffect(() => {
    const fetchCompanyProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get("/company/my-products"); 
        
        setProducts(response.data.products || response.data);
        setCompanyName(response.data.companyName || ""); 
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load company products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProducts();
  }, []);

  // Pagination Computation Blocks
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      
      {/* Products Segment Grid Row wrapper */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        
        {/* Dynamic Products Grid Panel */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Featured Products</h2>
                <span className="text-sm text-slate-400">
                  Showing {products.length > 0 ? indexOfFirstItem + 1 : 0}-
                  {Math.min(indexOfLastItem, products.length)} of {products.length}
                </span>
              </div>

              {/* Loader/Error handling layers */}
              {loading && (
                <div className="text-center text-cyan-400 py-12 font-semibold">
                  Fetching live data streams...
                </div>
              )}

              {error && (
                <div className="text-center text-red-400 border border-red-500/20 bg-red-500/5 rounded-xl p-4 my-4">
                  {error}
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div className="text-center text-slate-500 py-12">
                  No products found. Register assets to get started.
                </div>
              )}

              {/* Centered 3-Card Grid Configuration Canvas */}
              <div className="grid md:grid-cols-3 gap-6 justify-items-center mx-auto w-full">
                {currentProducts.map((product) => (
                  <div key={product._id || product.id} className="w-full max-w-[280px] md:max-w-full">
                    <ProductCard
                      name={product.name}
                      company={companyName || product.company?.name || "Your Company"}
                      category={product.category || "General"}
                      // 🌟 TRANSMITTING LIVE ARRAYS FIELDS AND DESCRIPTIONS DOWN FROM MONGOOSE
                      description={product.description} 
                      image={product.images && product.images.length > 0 ? product.images[0] : product.image}
                      onViewDetails={() => navigate(`/product/${product._id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls Layout Section */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-800/60">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 transition-all text-sm"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-400 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 font-medium hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 transition-all text-sm"
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>

      
      </div>

    </div>
  );
}