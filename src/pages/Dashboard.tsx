import { useState, useEffect } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setTotalUsers(users.length);
  }, []);

  return (
    <div style={{ color: "#fff" }}>
      <h1 style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}>Overview</h1>

      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "20px",
          padding: isMobile ? "16px" : "24px",
          marginBottom: "32px",
          border: "1px solid #2a2a2a",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: isMobile ? "18px" : "20px" }}>
          📋 امکانات داشبورد
        </h2>
        <ul style={{ lineHeight: "1.8", paddingLeft: "20px", fontSize: isMobile ? "14px" : "16px" }}>
          <li>✅ مدیریت کاربران (مشاهده، جستجو، مرتب‌سازی، صفحه‌بندی)</li>
          <li>✅ نقش‌های ادمین و کاربر معمولی با دسترسی‌های متفاوت</li>
          <li>✅ افزودن، ویرایش و حذف کاربر (فقط ادمین)</li>
          <li>✅ فعال/غیرفعال کردن کاربران (فقط ادمین)</li>
          <li>✅ سیستم لاگین و ثبت‌نام امن با LocalStorage</li>
          <li>✅ تم دارک یکپارچه و واکنش‌گرا</li>
        </ul>
      </div>

      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "20px",
          padding: isMobile ? "16px" : "24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: "bold", marginBottom: "8px" }}>
          {totalUsers}
        </div>
        <div style={{ fontSize: isMobile ? "14px" : "18px", color: "#aaa" }}>
          تعداد کل کاربران ثبت‌شده
        </div>
      </div>
    </div>
  );
};

export default Dashboard;