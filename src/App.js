import "./App.scss";
import Homepage from "./pages/Homepage";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Signup from "./pages/Signup";
import AuthProvider from "./Context/AuthContext";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
