import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", formData);
      console.log(response.data);
      alert("Login successful", response.data.message);
      setToken(response.data.token);
    } catch (error) {
      alert("Login failed:");
      console.error(error.message, error.error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <p>
        还没有账号？ <Link to="/register">去注册</Link>
      </p>
    </div>
  );
};

export default Login;
