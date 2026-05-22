import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedBold, PiEyesFill } from "react-icons/pi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    // 1. اعتبارسنجی فیلدهای ضروری
    if (!form.fname.trim()) {
      alert("First name is required.");
      return;
    }
    if (!form.lname.trim()) {
      alert("Last name is required.");
      return;
    }
    if (!form.email.trim()) {
      alert("Email is required.");
      return;
    }
    // بررسی ساده ایمیل (حداقل @ و .)
    if (!form.email.includes("@") || !form.email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!form.password) {
      alert("Password is required.");
      return;
    }
    if (!form.age) {
      alert("Age is required.");
      return;
    }
    const ageNum = Number(form.age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      alert("Please enter a valid age (1-120).");
      return;
    }

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
      age: ageNum,
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
        padding: "16px",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <div
        style={{
          background: "#1c1c1c",
          padding: "32px",
          borderRadius: "24px",
          width: "500px",
          maxWidth: "100%",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            marginBottom: "24px",
            textAlign: "center",
            fontSize: "28px",
          }}
        >
          Signup
        </h1>

        <input
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleChange}
          className="input-base"
          required
          style={{ marginBottom: "12px" }}
        />
        <input
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleChange}
          className="input-base"
          required
          style={{ marginBottom: "12px" }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input-base"
          required
          style={{ marginBottom: "12px" }}
        />

        <div style={{ position: "relative", marginBottom: "12px" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-base"
            required
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
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? <PiEyesFill /> : <PiEyeClosedBold />}
          </span>
        </div>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input-base"
          style={{ marginBottom: "12px" }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="input-base age-input"
          required
          style={{ marginBottom: "12px" }}
        />

        {/* Admin Code field (optional) */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <input
            name="adminCode"
            type={showAdminCode ? "text" : "password"}
            placeholder="Admin Code (optional)"
            value={form.adminCode}
            onChange={handleChange}
            className="input-base"
            style={{ marginBottom: 0 }}
          />
          <span
            onClick={() => setShowAdminCode(!showAdminCode)}
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#aaa",
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showAdminCode ? <PiEyesFill /> : <PiEyeClosedBold />}
          </span>
        </div>

        <button
          className="btn-primary"
          onClick={handleSignup}
          style={{ marginTop: "8px" }}
        >
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

export default Signup;
