import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/store`);
      console.log(res.data); // Debug API response
      setProducts(res.data.products || res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Products Page</h3>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
      <hr />

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}
      {!loading && products.length === 0 && <p>No products available</p>}

      <div className="row">
        {Array.isArray(products) &&
          products.map((product) => (
            <div className="box" key={product._id || product.id}>
              <img
                src={`${API_URL}/${product.image}`}
                width="300px"
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <h4>Price: ${product.price}</h4>
              <button>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Content;