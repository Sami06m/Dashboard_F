import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout: authLogout } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setForm({
      fname: user.fname || "",
      lname: user.lname || "",
      email: user.email || "",
      password: "",
    });
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex === -1) {
      setMessage("User not found!");
      return;
    }
    const updatedUser = {
      ...users[userIndex],
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password || users[userIndex].password,
    };
    users[userIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
    updateUser(updatedUser);
    setMessage("Profile updated successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    )
      return;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter((u: any) => u.id !== user.id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  if (!user) return null;
  const inputPadding = isMobile ? "10px" : "12px";

  return (
    <div
      style={{
        color: "#fff",
        maxWidth: isMobile ? "100%" : "600px",
        margin: "0 auto",
        padding: isMobile ? "0 16px" : "0",
      }}
    >
      <h1
        style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}
      >
        Settings
      </h1>
      {message && (
        <div
          style={{
            background: "#4caf50",
            color: "#fff",
            padding: "12px",
            borderRadius: "12px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
      <div
        style={{
          background: "#1c1c1c",
          padding: isMobile ? "20px" : "32px",
          borderRadius: "24px",
          border: "1px solid #2a2a2a",
        }}
      >
        <h2
          style={{ marginBottom: "24px", fontSize: isMobile ? "18px" : "20px" }}
        >
          Edit Profile
        </h2>
        <input
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleChange}
          className="input-base"
          style={{ padding: inputPadding, marginBottom: "16px" }}
        />
        <input
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleChange}
          className="input-base"
          style={{ padding: inputPadding, marginBottom: "16px" }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input-base"
          style={{ padding: inputPadding, marginBottom: "16px" }}
        />
        <input
          name="password"
          type="password"
          placeholder="New Password (leave blank to keep current)"
          value={form.password}
          onChange={handleChange}
          className="input-base"
          style={{ padding: inputPadding, marginBottom: "16px" }}
        />
        <button
          onClick={handleUpdateProfile}
          className="btn-primary"
          style={{
            width: "100%",
            padding: isMobile ? "10px" : "12px",
            marginTop: "8px",
          }}
        >
          Save Changes
        </button>
        <hr style={{ margin: "32px 0", borderColor: "#333" }} />
        <button
          onClick={handleDeleteAccount}
          className="btn-danger"
          style={{
            width: "100%",
            marginBottom: "16px",
            padding: isMobile ? "10px" : "12px",
          }}
        >
          Delete Account
        </button>
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{ width: "100%", padding: isMobile ? "10px" : "12px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
