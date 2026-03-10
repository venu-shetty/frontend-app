import {useEffect, useState} from "react"
import axios from "axios";

function Content() {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
     const fetchProducts = async () => {
    const url = "http://localhost:5000/products";
    const res = await axios.get(url);
    setProducts(res.data);
  };
    useEffect(fetchProducts, [] );

    return (
        <div>
            <h2>Product Page</h2>
            <p>You clicked {count} times</p>
            <button onClick={increment}>
                Increment
            </button>
            <button onClick={decrement}>
                Decrement
            </button>
            <ol>
        {products.map((product) => (
          <li>{product.name}</li>
        ))}
      </ol>
        </div>
    );
}
export default Content