import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../images/logo.jpg";
import "./Login.scss";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleLogin, githubLogin } = useAuth();

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    login(emailRef.current.value, passwordRef.current.value);
    setLoading(false);
    navigate(-1);
  }

  function signInWithGoogle() {
    googleLogin();
    navigate("/dashboard");
  }

  function signInWithGithub() {
    githubLogin();
    navigate("/dashboard");
  }

  return (
    <div className="login-form-container">
      <div className="login-form-controll">
        <div className="icon-container">
          <img src={logo} alt="FASTER" />
        </div>
        <form className="login-form">
          {error && <div className="alert">{error}</div>}
          <div className="inputs">
            <div className="inputs-controll">
              <FontAwesomeIcon icon={solid("envelope")} className="icon" />
              <input
                type="text"
                placeholder="Email address  *"
                ref={emailRef}
                onChange={handleInput}
                required
              />
            </div>
            <div className="inputs-controll">
              <FontAwesomeIcon icon={solid("lock")} className="icon" />
              <input
                type="password"
                placeholder="Password *"
                ref={passwordRef}
                onChange={handleInput}
                required
              />
            </div>
            <div className="forgot-password">
              <Link to="/password-reset">Forgot password?</Link>
            </div>
          </div>

          <button
            className="login-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            Login
          </button>
        </form>
        <div className="buttons">
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
      </div>
    </div>
  );
};

export default Login;
