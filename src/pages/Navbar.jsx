import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const headers = [
    { name: "Home", link: "/", class: "home" },
    { name: "About", link: "/about", class: "about" },
    { name: "Login", link: "/login", class: "login" },
    { name: "Signup", link: "/signup", class: "signup" },
  ];
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <h1>FASTER</h1>
        </Link>
        <div className="control">
          {headers.map((header) => (
            <Link to={header.link} className={header.class} key={header.name}>
              {header.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
