import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/store`);
      setProducts(res.data);   // ✅ fix
    } catch (err) {
      console.log("Failed to load");
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

      <div className="row">
        {products.map((product) => (
          <div className="box" key={product._id}>
            <img src={product.imageUrl} width="300px" alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <h4>Price: ₹{product.price}</h4>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;