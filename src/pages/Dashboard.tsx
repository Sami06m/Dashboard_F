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
      <h1
        style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}
      >
        Overview
      </h1>

      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "20px",
          padding: isMobile ? "16px" : "24px",
          marginBottom: "32px",
          border: "1px solid #2a2a2a",
          textAlign: "left",
        }}
      >
        <h2
          style={{ marginBottom: "16px", fontSize: isMobile ? "18px" : "20px" }}
        >
          📋 Dashboard Features
        </h2>
        <ul
          style={{
            lineHeight: "1.8",
            paddingLeft: "20px",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          <li>
            Complete user management (search, sort, pagination, export to Excel)
          </li>
          <li>
            Role‑based access control (Admin with full access, Regular user with
            limited access)
          </li>
          <li>
            Admin operations (add, edit, delete, activate/deactivate users)
          </li>
          <li>
            Personal profile (avatar gallery, edit information, delete account)
          </li>
          <li>
            Analytics charts (gender distribution, user status, growth trend)
          </li>
          <li>
            Fully responsive design (hamburger menu on mobile, unified dark
            theme)
          </li>
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
        <div
          style={{
            fontSize: isMobile ? "36px" : "48px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          {totalUsers}
        </div>
        <div style={{ fontSize: isMobile ? "14px" : "18px", color: "#aaa" }}>
          Total users
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
