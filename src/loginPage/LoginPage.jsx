import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Код выполняется!");
      let response;
      if (email && password && username) {
        response = await axios.post(
          "http://localhost:8080/sign-up",
          {
            email,
            password,
            username,
          },
          {
            validateStatus: (status) => status < 500, // Только 500+ ошибки пойдут в catch
          }
        );
        console.log("Ответ от сервера:", response);
        if (response?.status === 200) {
          login();
          localStorage.setItem("token", response.data.token);
          navigate("/success-sign-up");
        } else {
          navigate("/error-sign-up");
          return;
        }
      } else if (email && password) {
        console.log("BEFORE");
        response = await axios.post(
          "http://localhost:8080/login",
          {
            email,
            password,
          },
          {
            validateStatus: (status) => status < 500, // Только 500+ ошибки пойдут в catch
          }
        );
        if (response?.status === 200) {
          login();
          localStorage.setItem("token", response.data.token);
          navigate("/success-login");
        } else {
          navigate("/error-login");
          return;
        }
      } else {
        navigate("/error-login");
      }
      console.log("Успех:", response.data);
    } catch (error) {
      navigate("/error-page");
    }
  };

  return (
    <div className="authContainer">
      <div className="authForm">
        <div className="authHeader">
          <h2 className="authTitle">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>
          <p>
            {isLogin ? (
              <>
                Or{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="authSwitch"
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="authSwitch">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="formGroup">
              <label htmlFor="username" class Name="formLabel">
                Full Name
              </label>
              <div className="formInputWrapper">
                <User className="formInputIcon" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="formInput"
                  placeholder="Pavel Durov"
                />
              </div>
            </div>
          )}

          <div className="formGroup">
            <label htmlFor="email" className="formLabel">
              Email address
            </label>
            <div className="formInputWrapper">
              <Mail className="formInputIcon" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="formInput"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <div className="formInputWrapper">
              <Lock className="formInputIcon" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="formInput"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="formSubmit">
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
