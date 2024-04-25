import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

const Login = () => {
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
      const response = await axios.post("/api/user/register", formData);
      alert("Register successful", response.message);
    } catch (error) {
      alert("Register failed");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
          Register
        </button>
      </form>
      <p>
        已有账号? <Link to="/login">去登录</Link>
      </p>
    </div>
  );
};

export default Login;
