import { useState, useEffect } from "react";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setTotalUsers(users.length);
  }, []);

  return (
    <div style={{ color: "#fff" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "28px" }}>Overview</h1>

      {/* معرفی قابلیت‌ها */}
      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "32px",
          border: "1px solid #2a2a2a",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>📋 امکانات داشبورد</h2>
        <ul style={{ lineHeight: "1.8", paddingLeft: "20px" }}>
          <li>✅ مدیریت کاربران (مشاهده، جستجو، مرتب‌سازی، صفحه‌بندی)</li>
          <li>✅ نقش‌های ادمین و کاربر معمولی با دسترسی‌های متفاوت</li>
          <li>✅ افزودن، ویرایش و حذف کاربر (فقط ادمین)</li>
          <li>✅ فعال/غیرفعال کردن کاربران (فقط ادمین)</li>
          <li>✅ سیستم لاگین و ثبت‌نام امن با LocalStorage</li>
          <li>✅ تم دارک یکپارچه و واکنش‌گرا</li>
        </ul>
      </div>

      {/* کارت آمار کاربران */}
      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "20px",
          padding: "24px",
          border: "1px solid #2a2a2a",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "8px" }}>
          {totalUsers}
        </div>
        <div style={{ fontSize: "18px", color: "#aaa" }}>تعداد کل کاربران ثبت‌شده</div>
      </div>
    </div>
  );
};

export default Dashboard;