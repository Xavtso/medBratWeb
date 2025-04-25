import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import "./Login.scss";
import { CgGoogle } from "react-icons/cg";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="login-subtitle">
          {isRegistering
            ? "Sign up to get started"
            : "Please log in to continue"}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          {isRegistering && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="login-input"
            />
          )}

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            {isRegistering ? "Sign Up" : "Log In"}
          </button>

          <button
            type="button"
            className="google-login-button"
            onClick={handleGoogleLogin}
          >
            <CgGoogle color="#10a37f" size={20} />
            {isRegistering ? "Sign up with Google" : "Continue with Google"}
          </button>
        </form>

        <div className="auth-toggle">
          {isRegistering ? (
            <p>
              Already have an account?{" "}
              <span
                className="signup-link"
                onClick={() => setIsRegistering(false)}
              >
                Log in
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                className="signup-link"
                onClick={() => setIsRegistering(true)}
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
