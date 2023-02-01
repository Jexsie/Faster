import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../images/logo.jpg";
import "./Signup.scss";
import { getDatabase, ref, set } from "firebase/database";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirmRef: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await recordUser();
    } catch {
      setError("Something went wrong, please try again");
    }
    setLoading(false);
  }

  async function recordUser() {
    const db = getDatabase();
    const reference = ref(db, "users");
    return set(reference, {
      email: currentUser.email,
      password: passwordRef.current.value,
    });
  }

  return (
    <div className="signup-form-container">
      <div className="signup-form-controll">
        <div className="icon-container">
          <img src={logo} alt="FASTER" />
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
