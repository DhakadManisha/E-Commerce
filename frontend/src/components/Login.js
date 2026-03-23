import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("manisha"); // Default values
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("🔐 Login attempt:", username, password);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: username,
        password: password
      });

      console.log("✅ Response:", response.data);

      // Backend se token mil raha hai ya nahi check karo
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        localStorage.setItem("token", response.data); // Direct string bhi ho sakta hai
      }

      console.log("💾 Token saved:", localStorage.getItem("token"));
      alert("Login SUCCESS!");
      navigate("/products");

    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
      alert("Login FAILED: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card p-4 shadow-lg" style={{width:"400px"}}>
        <h3 className="text-center mb-4 text-primary">🔐 Login</h3>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          className="btn btn-success w-100 mb-3"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="text-center">
          <button className="btn btn-link p-0" onClick={() => navigate("/register")}>
            New user? Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
