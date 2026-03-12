import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });

      // If login successful
      setUser(response.data);
      navigate("/"); // Go to home
    } catch (err) {
      // If user not found
      if (err.response && err.response.status === 404) {
        alert("User not found. Please register first."); // Alert message
        setEmail("");
        setPassword("");
      } else if (err.response && err.response.status === 401) {
        alert("Invalid password. Try again.");
      } else {
        alert("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </p>
      <p>
        <button onClick={handleLogin}>Login</button>
      </p>
      <p>
        <Link to="/register">New user? Register here</Link>
      </p>
    </div>
  );
}

export default Login;