import { Link } from "react-router-dom";
function Register() {
    return (
        <div>
            <h1>Registration Page</h1>
            <form>
                <p><input type="text" placeholder="Username" /></p>
                <p><input type="email" placeholder="Email" /></p>
                <p><input type="password" placeholder="Password" /></p>
                <p><button type="submit">Register</button></p>
                <p><Link to="/login">Already have an account? Login here</Link></p>
            </form>
        </div>
    );
}

export default Register;