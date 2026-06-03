import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex gap-6">
            <Link to="/" className="hover:text-gray-200">
              Dashboard
            </Link>

            <Link to="/products" className="hover:text-gray-200">
              Products
            </Link>

            <Link to="/customers" className="hover:text-gray-200">
              Customers
            </Link>

            <Link to="/orders" className="hover:text-gray-200">
              Orders
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;