import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

const CreateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
    status: "active",
  });

  useEffect(() => {
    const state = location.state as { user?: any } | null;
    if (state?.user) {
      setIsEditMode(true);
      setEditUserId(state.user.id);
      setForm({
        fname: state.user.fname || "",
        lname: state.user.lname || "",
        email: state.user.email || "",
        password: "",
        gender: state.user.gender || "male",
        age: state.user.age?.toString() || "",
        status: state.user.status || "active",
      });
    } else {
      setIsEditMode(false);
      setEditUserId(null);
      setForm({
        fname: "",
        lname: "",
        email: "",
        password: "",
        gender: "male",
        age: "",
        status: "active",
      });
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser || loggedInUser.role !== "admin") {
      alert("You don't have permission to do this!");
      navigate("/users");
      return;
    }

    if (isEditMode && editUserId) {
      const userIndex = users.findIndex((u: any) => u.id === editUserId);
      if (userIndex === -1) {
        alert("User not found!");
        navigate("/users");
        return;
      }
      const existingUser = users[userIndex];
      const updatedUser = {
        ...existingUser,
        fname: form.fname,
        lname: form.lname,
        email: form.email,
        password: form.password || existingUser.password,
        gender: form.gender,
        age: parseInt(form.age),
        status: form.status,
      };
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
      if (loggedInUser.id === editUserId) {
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }
      alert("User updated successfully!");
      navigate("/users");
    } else {
      if (users.some((u: any) => u.email === form.email)) {
        alert("This email already exists!");
        return;
      }
      if (!form.password) {
        alert("Please enter a password");
        return;
      }
      const newUser = {
        id: Date.now(),
        fname: form.fname,
        lname: form.lname,
        email: form.email,
        password: form.password,
        gender: form.gender,
        age: parseInt(form.age),
        role: "user",
        status: form.status,
      };
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("User created successfully!");
      navigate("/users");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "16px" : "24px" }}>
      <div style={{ background: "#1c1c1c", borderRadius: "24px", padding: isMobile ? "20px" : "32px", maxWidth: "550px", width: "100%", color: "#fff" }}>
        <h1 style={{ marginBottom: "32px", fontSize: isMobile ? "24px" : "28px", textAlign: "center" }}>
          {isEditMode ? "Edit User" : "Create New User"}
        </h1>

        <input name="fname" placeholder="First Name" value={form.fname} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />
        <input name="lname" placeholder="Last Name" value={form.lname} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />
        <input name="password" type="password" placeholder={isEditMode ? "New Password (leave blank to keep current)" : "Password"} value={form.password} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#aaa" }}>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }} />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#aaa" }}>Status</label>
        <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, padding: isMobile ? "10px" : "12px", marginBottom: "16px" }}>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>

        <div style={{ display: "flex", gap: "16px", marginTop: "32px", flexDirection: isMobile ? "column" : "row" }}>
          <button onClick={handleSubmit} style={{ ...buttonStyle, background: "#3b82f6", flex: 1, padding: isMobile ? "10px" : "12px" }}>
            {isEditMode ? "Update User" : "Save User"}
          </button>
          <button onClick={() => navigate("/users")} style={{ ...buttonStyle, background: "#555", flex: 1, padding: isMobile ? "10px" : "12px" }}>
            Cancel
          </button>
        </div>
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

export default CreateUser;