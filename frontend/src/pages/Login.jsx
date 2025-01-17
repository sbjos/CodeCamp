import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate("");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const token = localStorage.getItem("lmsusertoken");

  // Redirects to apropriate dashboard based on authority if session exist
  useEffect(() => {
    if (token || userAuthority) {
      const authority = userAuthority.split(", ")[1];
      if (authority === "[LEARNER]") {
        navigate("/api/dashboard");
      }
      if (authority === "[REVIEWER]") {
        navigate("/api/dashboard/reviewer");
      }
      if (authority === "[ADMIN]") {
        navigate("/api/admin");
      }
    }
  }, []);

  // Sumbit a request to login to application.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      const userAuthority = response.headers.authority.slice(1, -1);
      const headerStorage = localStorage.setItem(
        "lmsusertoken",
        response.headers.authorization.split(" ")[1]
      );
      const tokenStorage = localStorage.setItem(
        "lmsuserauthorities",
        userAuthority
      );

      // redirect to apropriate dashboard based on authority after successfull login
      const authority = userAuthority.split(", ")[1];
      if (authority === "[LEARNER]") {
        navigate("/api/dashboard");
      }
      if (authority === "[REVIEWER]") {
        navigate("/api/reviewer/dashboard");
      }
      if (authority === "[ADMIN]") {
        navigate("/api/admin");
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else {
        console.error(err);
        setError("Login failed");
      }
    }
  };

  return (
    <>
      <div className="login-header">
        <h1>Login</h1>
      </div>
      <div className="login-burger">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="form-login-username">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-login-password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div id="error">{error}</div>
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
