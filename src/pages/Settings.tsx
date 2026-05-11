import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      password: "", // رمز جدید را خالی می‌گذاریم
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    if (!user) return;

    // دریافت لیست کاربران
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex === -1) {
      setMessage("User not found!");
      return;
    }

    // بروزرسانی اطلاعات
    const updatedUser = {
      ...users[userIndex],
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password || users[userIndex].password, // اگر رمز جدید وارد نشده، همان قبلی بماند
    };

    users[userIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage("پروفایل با موفقیت به‌روزرسانی شد.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    const confirmDelete = window.confirm(
      "آیا از حذف حساب کاربری خود مطمئن هستی؟ این عمل غیرقابل بازگشت است."
    );
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
    <div style={{ color: "#fff", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "28px" }}>تنظیمات</h1>

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
          padding: "32px",
          borderRadius: "24px",
          border: "1px solid #2a2a2a",
        }}
      >
        <h2 style={{ marginBottom: "24px", fontSize: "20px" }}>ویرایش پروفایل</h2>

        <input
          name="fname"
          placeholder="نام"
          value={form.fname}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="lname"
          placeholder="نام خانوادگی"
          value={form.lname}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="رمز جدید (در صورت تمایل)"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleUpdateProfile} style={{ ...buttonStyle, background: "#3b82f6", width: "100%" }}>
          ذخیره تغییرات
        </button>

        <hr style={{ margin: "32px 0", borderColor: "#333" }} />

        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>خطر!</h2>
        <button
          onClick={handleDeleteAccount}
          style={{ ...buttonStyle, background: "#ef4444", width: "100%", marginBottom: "16px" }}
        >
          حذف حساب کاربری
        </button>

        <button
          onClick={handleLogout}
          style={{ ...buttonStyle, background: "#555", width: "100%" }}
        >
          خروج از حساب
        </button>
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
  padding: "12px",
  borderRadius: "40px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
};

export default Settings;