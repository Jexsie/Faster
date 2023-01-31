import { useEffect, useState } from "react";
import "./App.scss";
import Homepage from "./pages/Homepage/Homepage";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/NavbarComponent/Navbar";
import Signup from "./pages/SignupPage/Signup";
import AuthProvider from "./Context/AuthContext";
import ModalContextProvider from "./Context/ModalContextProvider";
import Login from "./pages/LoginPage/Login";
import LoadingApp from "./LoadingApp/LoadingApp";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./pages/ProfilePage/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading && <LoadingApp />}
      {!loading && (
        <div className="App">
          <AuthProvider>
            <ModalContextProvider>
              <Router>
                <Navbar />
                <Routes>
                  <Route element={<PrivateRoutes />}>
                    <Route exact path="/" element={<Homepage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Router>
            </ModalContextProvider>
          </AuthProvider>
        </div>
      )}
    </>
  );
}

export default App;
