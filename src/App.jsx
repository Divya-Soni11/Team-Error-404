import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Diagnostic from "./pages/Diagnostic";
import CompanyPortal from "./pages/CompanyPortal";
import Analytics from "./pages/Analytics";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

function AppContent() {
  const location = useLocation();
  
  // Check if the user is logged in as a company
  const role = localStorage.getItem("role");
  const isCompany = role === "company";

  const authPages = [
    "/login",
    "/signup",
    "/user-login",
    "/user-signup",
  ];

  const isAuthPage = authPages.includes(location.pathname);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
      </Routes>
    );
  }

  // Hide Sidebar + Navbar on Diagnostic & Company
  const fullScreenPages = [
    "/diagnostic",
    "/company",
  ];

  const isFullScreen = fullScreenPages.includes(location.pathname);

  if (isFullScreen) {
    return (
      <Routes>
        <Route path="/diagnostic" element={<Diagnostic />} />
        {/* Protect Company Portal Route */}
        <Route 
          path="/company" 
          element={isCompany ? <CompanyPortal /> : <Navigate to="/" />} 
        />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Protect Catalog and Analytics Routes */}
            <Route 
              path="/catalog" 
              element={isCompany ? <Catalog /> : <Navigate to="/" />} 
            />
            <Route 
              path="/analytics" 
              element={isCompany ? <Analytics /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}