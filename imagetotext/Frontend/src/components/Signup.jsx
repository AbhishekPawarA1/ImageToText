import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../css/Signup.css";

const Signup = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8879/auth/signup`, user);
      console.log("Signup successful:", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup Failed", error);
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <div className="form-fields">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter UserName"
              name="username"
              value={user.username}
              autoComplete="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter E-mail"
              name="email"
              value={user.email}
              autoComplete="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              autoComplete="current-password"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="form-button">
          Sign Up
        </button>
        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <a href="/login" className="signup-link">
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
