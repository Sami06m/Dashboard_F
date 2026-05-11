import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
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
        <h1 style={{ color: "#fff", marginBottom: "32px", textAlign: "center" }}>
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
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
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

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
  fontSize: "14px",
  boxSizing: "border-box" as "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#3b82f6",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "8px",
};

export default Login;