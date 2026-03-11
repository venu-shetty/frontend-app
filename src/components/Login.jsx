import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login">
            <h1>Login Page</h1>
            <form>
                <p><input type="email" placeholder="Email" /></p>
                <p><input type="password" placeholder="Password" /></p>
                <p><button type="submit">Login</button></p>
            </form>
            <p><Link to="/register">New User? Register here</Link></p>
        </div>
    );
}

export default Login;