import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../images/logo.jpg";
import "./Signup.scss";
import { db } from "../../FirebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirmRef: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();

    users.map((user) => {
      if (user.email === emailRef.current.value) {
        // return setError("User already exists");
        console.log(user.email);
      }
      return null;
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (
      !passwordConfirmRef.current.value ||
      !passwordRef ||
      !emailRef.current.value
    ) {
      return setError("Please, all the fields are required");
    }

    users.map((user) => {
      if (user.email === emailRef.current.value) {
        return setError("User already exists");
        // console.log(user.email);
      }
      return null;
    });

    setError("");
    setLoading(true);
    // await signup(emailRef.current.value, passwordRef.current.value);
    await addDoc(usersCollectionRef, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }).then(() => {
      // <Navigate replace to="/dashboard" />;
      navigate("/dashboard");
    });
    setLoading(false);
  }

  return (
    <div className="signup-form-container">
      <div className="signup-form-controll">
        <div className="icon-container">
          <img src={logo} alt="FASTER" />
          {JSON.stringify(users)}
        </div>
        <form className="signup-form">
          {error && <div className="alert">{error}</div>}
          {currentUser && currentUser.email}
          <div className="inputs">
            <div className="inputs-controll">
              <FontAwesomeIcon icon={solid("envelope")} className="icon" />
              <input
                type="text"
                name="email"
                value={form.email}
                placeholder="E-mail *"
                ref={emailRef}
                onChange={handleInput}
                required
              />
            </div>

            <div className="inputs-controll">
              <FontAwesomeIcon icon={solid("lock")} className="icon" />

              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Password *"
                ref={passwordRef}
                onChange={handleInput}
                required
              />
            </div>
            <div className="inputs-controll">
              <FontAwesomeIcon icon={solid("lock")} className="icon" />
              <input
                type="password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                placeholder="Confirm password"
                ref={passwordConfirmRef}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <button type="submit" onClick={handleSubmit} disabled={loading}>
            Sign Up
          </button>
        </form>
        <div className="buttons">
          <button>Signup with Google</button>
          <button>Signup with Github</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
