import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";
import { getOrders } from "../services/orderService";

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    lowStock: 0,
  });

  const loadDashboard = async () => {
    try {
      const products = await getProducts();
      const customers = await getCustomers();
      const orders = await getOrders();

      const lowStockProducts = products.filter(
        (product) => product.quantity < 5
      );

      setStats({
        products: products.length,
        customers: customers.length,
        orders: orders.length,
        lowStock: lowStockProducts.length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold">
            {stats.products}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Customers</h3>
          <p className="text-3xl font-bold">
            {stats.customers}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold">
            {stats.orders}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Low Stock Products</h3>
          <p className="text-3xl font-bold text-red-500">
            {stats.lowStock}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;