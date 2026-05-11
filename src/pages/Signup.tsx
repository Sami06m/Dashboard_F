import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
    adminCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((u: any) => u.email === form.email);

    if (emailExists) {
      alert("This email already exists!");
      return;
    }

 
    const role = form.adminCode === "ADMIN2025" ? "admin" : "user";


    const newUser = {
      id: Date.now(),
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password,
      gender: form.gender,
      age: parseInt(form.age),
      role: role,
      status: "active",
    };


    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));


    alert("Account created successfully! Please login.");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f0f",
        overflow: "auto",
      }}
    >
      <div
        style={{
          background: "#1c1c1c",
          padding: "40px",
          borderRadius: "24px",
          width: "500px",
          margin: "40px 0",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: "32px", textAlign: "center" }}>
          Signup
        </h1>

        <input
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <select name="gender" value={form.gender} onChange={handleChange} style={inputStyle}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="adminCode"
          type="password"
          placeholder="Admin Code (optional)"
          value={form.adminCode}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleSignup} style={buttonStyle}>
          Create Account
        </button>

        <p style={{ color: "#aaa", textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
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

export default Signup;