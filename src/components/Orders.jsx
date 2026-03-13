import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Orders.css";

const API_URL = import.meta.env.VITE_API_URL;

function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-box" key={order._id}>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Product:</strong> {order.product}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            {order.createdAt && (
              <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;