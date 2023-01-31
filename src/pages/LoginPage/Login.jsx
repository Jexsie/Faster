import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.scss";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleLogin, githubLogin } = useAuth();
  // const navigate = useNavigate();

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed! Please check your email or password and try again.");
    }
    setLoading(false);
    setLoggedIn(true);
    // navigate("/dashboard");
  }

  function signInWithGoogle() {
    googleLogin();
    setLoggedIn(true);
    // navigate("/dashboard");
  }

  function signInWithGithub() {
    githubLogin();
    setLoggedIn(true);
    // navigate("/dashboard");
  }

  return (
    <div className="login-form">
      {error && <div className="alert">{error}</div>}
      {loggedIn && <h1>LOGGED IN</h1>}
      <input
        type="text"
        placeholder="type your email address"
        ref={emailRef}
        onChange={handleInput}
      />
      <input
        type="password"
        placeholder="password"
        ref={passwordRef}
        onChange={handleInput}
      />
      <button onClick={handleSubmit} disabled={loading}>
        Login
      </button>
      <button onClick={signInWithGoogle} disabled={loading}>
        Sign in with Google
      </button>
      <button onClick={signInWithGithub} disabled={loading}>
        Sign in with Github
      </button>
      <div>
        <p>
          New to FASTER? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
