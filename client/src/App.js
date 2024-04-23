import "./App.css";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

function App() {
  const [token, setToken] = useState();

  const isAuthenticated = () => {
    if (token) {
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");

      setToken();

      <Navigate to="/Login" />;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <ul className="App-header">
          <li>
            <NavLink to="/Home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Login">Login</NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/Login" element={<Login setToken={setToken} />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route
            path="/Home"
            element={
              isAuthenticated() ? <FileExplorer /> : <Navigate to="/Login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
