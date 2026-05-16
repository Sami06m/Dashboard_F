import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const logged = localStorage.getItem("loggedInUser");
    if (!logged) {
      navigate("/login");
      return;
    }
    const loggedUser = JSON.parse(logged);
    setUser(loggedUser);
    setForm({
      fname: loggedUser.fname || "",
      lname: loggedUser.lname || "",
      email: loggedUser.email || "",
      password: "",
    });
  }, [navigate]);

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
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage("Profile updated successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter((u: any) => u.id !== user.id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div style={{ color: "#fff", maxWidth: isMobile ? "100%" : "600px", margin: "0 auto", padding: isMobile ? "0 16px" : "0" }}>
      <h1 style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}>Settings</h1>

      {message && (
        <div style={{ background: "#4caf50", color: "#fff", padding: "12px", borderRadius: "12px", marginBottom: "20px", textAlign: "center" }}>
          {message}
        </div>
      )}

      <div style={{ background: "#1c1c1c", padding: isMobile ? "20px" : "32px", borderRadius: "24px", border: "1px solid #2a2a2a" }}>
        <h2 style={{ marginBottom: "24px", fontSize: isMobile ? "18px" : "20px" }}>Edit Profile</h2>

        <input name="fname" placeholder="First Name" value={form.fname} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />
        <input name="lname" placeholder="Last Name" value={form.lname} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />
        <input name="password" type="password" placeholder="New Password (leave blank to keep current)" value={form.password} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />

        <button onClick={handleUpdateProfile} style={{ ...buttonStyle, background: "#3b82f6", width: "100%", padding: isMobile ? "10px" : "12px" }}>
          Save Changes
        </button>

        <hr style={{ margin: "32px 0", borderColor: "#333" }} />

        <button onClick={handleDeleteAccount} style={{ ...buttonStyle, background: "#ef4444", width: "100%", marginBottom: "16px", padding: isMobile ? "10px" : "12px" }}>
          Delete Account
        </button>

        <button onClick={handleLogout} style={{ ...buttonStyle, background: "#555", width: "100%", padding: isMobile ? "10px" : "12px" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
  fontSize: "14px",
  boxSizing: "border-box" as "border-box",
};

const buttonStyle = {
  borderRadius: "40px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
};

export default Settings;