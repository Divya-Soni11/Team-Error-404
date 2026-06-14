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

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

function Layout() {
  const location = useLocation();

  const authPages = [
    "/login",
    "/signup",
    "/user-login",
    "/user-signup",
  ];

  const hideNavbarPages = [
    "/company",
  ];

  const isAuthPage =
    authPages.includes(location.pathname);

  const hideNavbar =
    hideNavbarPages.includes(
      location.pathname
    );

  if (isAuthPage) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/user-login"
          element={<UserLogin />}
        />

        <Route
          path="/user-signup"
          element={<UserSignup />}
        />
      </Routes>
    );
  }

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