import "./App.css";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
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
            <NavLink to="/">Log Out</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/Home" element={<FileExplorer />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
