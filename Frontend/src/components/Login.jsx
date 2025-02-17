import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; 

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8879/auth/login", user);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
      console.log("Error while logging in", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Welcome to Our Site</h1>
        <p>Please login to continue.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="form-button">
              Login
            </button>
          </div>
        </form>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
