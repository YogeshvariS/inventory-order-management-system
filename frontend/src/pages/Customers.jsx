import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCustomers();
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
      await createCustomer(formData);

      setFormData({
        full_name: "",
        email: "",
        phone: "",
      });

      await loadCustomers();
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating customer");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      await loadCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customers</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid gap-4"
      >
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Add Customer
        </button>
      </form>

      <div className="grid gap-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{customer.full_name}</h3>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>

            <button
              onClick={() => handleDelete(customer.id)}
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

export default Customers;