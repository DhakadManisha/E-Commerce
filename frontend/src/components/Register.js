import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password
      });

      // If backend returns token after registration
      if (res.data) {
        localStorage.setItem("token", res.data);
        window.dispatchEvent(new Event("login"));
      }

      alert("Registration Successful!");
      navigate("/products");
    } catch (err) {
      alert("Registration Failed: " + (err.response?.data || err.message));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card p-4 shadow-lg" style={{width:"400px", maxWidth:"90vw"}}>
        <h3 className="text-center mb-4 text-success">📝 Register</h3>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleRegister}
          disabled={loading || !username || !password}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <div className="text-center">
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Already have account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
