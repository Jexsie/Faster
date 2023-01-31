import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navbar.scss";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();
  const headers = [
    {
      name: "Home",
      link: "/",
      func: () => {},
    },
    {
      name: "About",
      link: "/about",
      func: () => {},
    },
    {
      name: currentUser ? "Profile" : "Sign up",
      link: currentUser ? "/profile" : "/signup",
      func: () => {},
    },
    {
      name: currentUser ? "Logout" : "Login",
      link: currentUser ? "#" : "/login",
      func: currentUser
        ? async function logout() {
            await logOut();
            setLoggedOut(true);
            navigate("/");
          }
        : () => {},
    },
  ];
  return (
    <>
      {}
      <div className="navbar">
        <Link to="/">
          <h1>FASTER</h1>
        </Link>
        <div className="control">
          {headers.map((header, index) => (
            <Link to={header.link} onClick={header.func} key={index}>
              {header.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
