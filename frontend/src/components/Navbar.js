import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token && token !== "null" && token.length > 10);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logout = () => {
    localStorage.clear(); // Clear everything
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <h3 className="text-white mb-0">🛒 MyStore</h3>
      <div className="d-flex gap-2">
        <Link to="/products" className="btn btn-outline-light">Products</Link>
        <Link to="/cart" className="btn btn-outline-light">Cart</Link>

        {isLoggedIn ? (
          <>
            <Link to="/orders" className="btn btn-outline-light">Orders</Link>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/" className="btn btn-outline-light">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
