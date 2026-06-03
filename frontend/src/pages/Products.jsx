import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
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
      await createProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: "",
      });

      await loadProducts();
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

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
          Add Product
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p>SKU: {product.sku}</p>
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.quantity}</p>
            </div>

            <button
              onClick={() => handleDelete(product.id)}
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

export default Products;