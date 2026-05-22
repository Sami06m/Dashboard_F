import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedBold, PiEyesFill } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );
    if (user) {
      login(user);
      navigate("/");
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f0f",
      }}
    >
      <div
        style={{
          background: "#1c1c1c",
          padding: "48px",
          borderRadius: "24px",
          width: "400px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}
      >
        <h1
          style={{ color: "#fff", marginBottom: "32px", textAlign: "center" }}
        >
          Login
        </h1>
        {error && (
          <div
            style={{
              background: "#ff4444",
              color: "#fff",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-base"
        />
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-base"
            style={{ marginBottom: 0 }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#aaa",
              fontSize: "18px",
              userSelect: "none",
            }}
          >
            {showPassword ? <PiEyesFill /> : <PiEyeClosedBold />}
          </span>
        </div>
        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p style={{ color: "#aaa", textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
