import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PiEyeClosedBold, PiEyesFill } from "react-icons/pi";

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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null",
    );
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

  const paddingVal = isMobile ? "10px" : "12px";

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
          borderRadius: "24px",
          padding: isMobile ? "20px" : "28px",
          maxWidth: "550px",
          width: "100%",
          color: "#fff",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            fontSize: isMobile ? "24px" : "28px",
            textAlign: "center",
          }}
        >
          {isEditMode ? "Edit User" : "Create New User"}
        </h1>

        <input
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleChange}
          className="input-base"
          style={{ marginBottom: "12px", padding: paddingVal }}
        />
        <input
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleChange}
          className="input-base"
          style={{ marginBottom: "12px", padding: paddingVal }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input-base"
          style={{ marginBottom: "12px", padding: paddingVal }}
        />

        {/* Password field with eye icon */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={
              isEditMode
                ? "New Password (leave blank to keep current)"
                : "Password"
            }
            value={form.password}
            onChange={handleChange}
            className="input-base"
            style={{ marginBottom: 0, padding: paddingVal }}
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

        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "13px",
            color: "#aaa",
          }}
        >
          Gender
        </label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input-base"
          style={{ marginBottom: "12px", padding: paddingVal }}
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
          style={{ marginBottom: "12px", padding: paddingVal }}
        />

        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "13px",
            color: "#aaa",
          }}
        >
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input-base"
          style={{ marginBottom: "12px", padding: paddingVal }}
        >
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <button
            className="btn-primary"
            onClick={handleSubmit}
            style={{ flex: 1, padding: "10px" }}
          >
            {isEditMode ? "Update User" : "Save User"}
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/users")}
            style={{ flex: 1, padding: "10px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
