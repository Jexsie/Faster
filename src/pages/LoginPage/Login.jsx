import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
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
    <div className="login-form-controll">
      <div className="login-form">
        {error && <div className="alert">{error}</div>}
        {loggedIn && <h1>LOGGED IN</h1>}
        <FontAwesomeIcon icon={solid("user")} />
        <div className="inputs">
          <div>
            <input
              type="text"
              placeholder="Email address"
              ref={emailRef}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="forgot-password">
          <p>Forgot password?</p>
        </div>
        <div className="buttons">
          <button onClick={handleSubmit} disabled={loading}>
            Login
          </button>
          <button onClick={signInWithGoogle} disabled={loading}>
            Sign in with Google
          </button>
          <button onClick={signInWithGithub} disabled={loading}>
            Sign in with Github
          </button>
        </div>
        <div>
          <p>
            New to FASTER? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
