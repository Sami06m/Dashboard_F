import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    // چک کردن اگر در حالت ویرایش هستیم (از طریق state یا query param)
    const state = location.state as { user?: any } | null;
    if (state?.user) {
      setIsEditMode(true);
      setEditUserId(state.user.id);
      setForm({
        fname: state.user.fname || "",
        lname: state.user.lname || "",
        email: state.user.email || "",
        password: "", // پسورد رو خالی میذاریم تا دوباره وارد کنه
        gender: state.user.gender || "male",
        age: state.user.age?.toString() || "",
        status: state.user.status || "active",
      });
    } else {
      // حالت افزودن معمولی
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

    // فقط ادمین اجازه دارد
    if (!loggedInUser || loggedInUser.role !== "admin") {
      alert("You don't have permission to do this!");
      navigate("/users");
      return;
    }

    if (isEditMode && editUserId) {
      // حالت ویرایش: کاربر موجود را پیدا کن و جایگزین کن
      const userIndex = users.findIndex((u: any) => u.id === editUserId);
      if (userIndex === -1) {
        alert("User not found!");
        navigate("/users");
        return;
      }

      // اگر رمز جدید وارد نشده، رمز قبلی را نگه دار
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
        // role را تغییر نمی‌دهیم (همان نقش قبلی)
      };

      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));

      // اگر کاربر خودش رو ویرایش کرده، اطلاعات لاگین رو هم آپدیت کن
      if (loggedInUser.id === editUserId) {
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }

      alert("User updated successfully!");
      navigate("/users");
    } else {
      // حالت افزودن کاربر جدید
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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "24px",
          padding: "32px",
          maxWidth: "550px",
          width: "100%",
          color: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "32px", fontSize: "28px", textAlign: "center" }}>
          {isEditMode ? "Edit User" : "Create New User"}
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
          placeholder={isEditMode ? "New Password (leave blank to keep current)" : "Password"}
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#aaa" }}>
          Gender
        </label>
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

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#aaa" }}>
          Status
        </label>
        <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>

        <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
          <button onClick={handleSubmit} style={{ ...buttonStyle, background: "#3b82f6", flex: 1 }}>
            {isEditMode ? "Update User" : "Save User"}
          </button>
          <button
            onClick={() => navigate("/users")}
            style={{ ...buttonStyle, background: "#555", flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
  fontSize: "14px",
  boxSizing: "border-box" as "border-box",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "40px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
};

export default CreateUser;