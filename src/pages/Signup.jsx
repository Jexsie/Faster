import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Signup.scss";

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
    } catch {
      setError("Something went wrong, please try again");
    }
    setLoading(false);
  }

  return (
    <div className="form-controll">
      <div className="form">
        {error && <div className="alert">{error}</div>}
        {currentUser && currentUser.email}
        <input
          type="text"
          name="email"
          value={form.email}
          placeholder="Enter e-mail"
          ref={emailRef}
          onChange={handleInput}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="password"
          ref={passwordRef}
          onChange={handleInput}
        />
        <input
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          placeholder="confirm password"
          ref={passwordConfirmRef}
          onChange={handleInput}
        />
        <button onClick={handleSubmit} disabled={loading}>
          Sign Up
        </button>
      </div>
      <div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <button>Signup with Google</button>
      <button>Signup with Github</button>
    </div>
  );
};

export default Signup;
