import { Link } from "react-router-dom";
function Logout() {
    return (
        <div>
            <h2>You have been logged out</h2>
            <p><Link to="/login">Login again</Link></p>
        </div>
    );
}

export default Logout;