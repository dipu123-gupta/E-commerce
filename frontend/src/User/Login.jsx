import React, { use } from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError, removeSuccess } from "../features/user/userSlice";
import { loginUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    dispatch(loginUser({ email: loginEmail, password: loginPassword }));
  };

  useEffect(() => {
    if (error) toast.error(error, { position: "top-center", autoClose: 3000 });
    dispatch(removeError());
  }, [error, dispatch]);

  useEffect(() => {
    if (success)
      toast.success(success, { position: "top-center", autoClose: 3000 });
    dispatch(removeSuccess());
  }, [success, dispatch]);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={loginSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="authBtn">
            Login
          </button>
          <p className="form-links">
            Forgot Your Password ?
            <Link to="/password/forgot">Reset Here</Link>{" "}
          </p>
          <p className="form-links">
            Don't have an account ?
            <Link to="/register">Register Here</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
