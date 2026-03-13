import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL; // https://backend-app-gvrq.onrender.com
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(""); // store API errors
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    // Prevent request if email is missing
    if (!user?.email) {
      console.error("User email is undefined");
      setOrders([]);
      setError("User email not found. Please login.");
      setLoading(false);
      return;
    }

    const url = `${API_URL}/orders/${user.email}`;
    console.log("Fetching orders from:", url);

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Ensure orders is always an array
      setOrders(Array.isArray(response.data) ? response.data : []);
      setError(""); // clear any previous errors
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders.");
      setOrders([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.email]); // refetch if email changes

  return (
    <div>
      <h1>My Orders</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <h3>Order Date: {new Date(order.orderDate).toLocaleDateString()}</h3>
            <ol>
              {(order.items || []).map((item) => (
                <li key={item._id}>
                  {item.name} - {item.price} - {item.quantity} -{" "}
                  {item.price * item.quantity}
                </li>
              ))}
            </ol>
            <h3>Order Value: {order.orderValue}</h3>
            <hr />
          </div>
        ))}

        {!loading && orders.length === 0 && !error && <p>No orders found.</p>}
      </div>
    </div>
  );
}

export default Orders;