import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import "../css/signup.css";

const Login: React.FC<{}> = () => {
  return (
    <div className="login-container">
      <div>
        <p className="login-heading">Login</p>
        <p className="welcome-back">Welcome back to ECOMMERCE</p>
        <p className="next-gen">The next gen business marketplace</p>
      </div>
      <div className="form-wrapper">
        <form>
          <div className="input-field">
            <label>Email</label>
            <input type="email" placeholder="Enter" />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input type="password" placeholder="Enter" />
          </div>
          <div className="input-field">
            <button className="input-field-btn">LOGIN</button>
          </div>
          <hr></hr>
          <p className="have-an-account">
            Don't have an account?{" "}
            <Link to={"/sign-up"} className="lgn-btn">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
