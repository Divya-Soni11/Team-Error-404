import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Diagnostic from "./pages/Diagnostic";
import CompanyPortal from "./pages/CompanyPortal";
import Analytics from "./pages/Analytics";

import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CompanyLogin from "./pages/companyLogin";   // ✅ Matches companyLogin.jsx
import CompanySignup from "./pages/companySignup"; // ✅ Matches companySignup.jsx

import ProductDetails from "./pages/ProductDetails";

function Layout() {
  const location = useLocation();

  const authPages = [
    "/companyLogin",   // ✅ CamelCase path token matches button navigation
    "/companySignup",  // ✅ CamelCase path token matches button navigation
    "/user-login",
    "/user-signup",
  ];

  const hideNavbarPages = [
    "/company",
  ];

  const isAuthPage = authPages.includes(location.pathname);
  const hideNavbar = hideNavbarPages.includes(location.pathname);

  // AUTH LAYER LAYER CONDITION ROUTING
  if (isAuthPage) {
    return (
      <Routes>

        {/* User Workspace Routes */}
        <Route
          path="/user-login"
          element={<UserLogin />}
        />
        <Route
          path="/user-signup"
          element={<UserSignup />}
        />

        <Route
          path="/companyLogin"
          element={<CompanyLogin />}
        />

        <Route
          path="/companySignup"
          element={<CompanySignup />}
        />
      </Routes>
    );
  }

  // MAIN WORKSPACE LAYOUT LAYER
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {!hideNavbar && <Navbar />}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/catalog"
              element={<Catalog />}
            />
            <Route
              path="/diagnostic"
              element={<Diagnostic />}
            />
            <Route
              path="/company"
              element={<CompanyPortal />}
            />
            <Route
              path="/analytics"
              element={<Analytics />}
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}