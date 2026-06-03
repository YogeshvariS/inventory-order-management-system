import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";

import {
  getOrders,
  createOrder,
  deleteOrder,
} from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  const loadData = async () => {
    try {
      const orderData = await getOrders();
      const productData = await getProducts();
      const customerData = await getCustomers();

      setOrders(orderData);
      setProducts(productData);
      setCustomers(customerData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrder({
        customer_id: Number(formData.customer_id),
        items: [
          {
            product_id: Number(formData.product_id),
            quantity: Number(formData.quantity),
          },
        ],
      });

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      await loadData();

      alert("Order created successfully");
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating order");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      await loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid gap-4"
      >
        <select
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.full_name}
            </option>
          ))}
        </select>

        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Stock: {product.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Create Order
        </button>
      </form>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">Order #{order.id}</h3>
              <p>Customer ID: {order.customer_id}</p>
              <p>Total Amount: ₹{order.total_amount}</p>
            </div>

            <button
              onClick={() => handleDelete(order.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;