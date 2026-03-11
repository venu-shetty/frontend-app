import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const fetchProducts = async () => {
        const url = `${API_URL}/store`;
        const res = await axios.get(url);
       setProducts(res.data.products);
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
            <div className="row"> <ol>
                {products.map((product) => (
                    <div className="box">
                        <img src={`${API_URL}/${product.image}`} width="300px" alt={product.name} />
                        <h3>Product Name: {product.name}</h3>
                        <p>Description: {product.desc}</p>
                        <h4>Price: ${product.price}</h4>
                        <p><button>Add to Cart</button></p>
                    </div>
                ))}
            </ol>
            </div>
        </div>
    );
}
export default Content;