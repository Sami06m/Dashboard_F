import { useNavigate } from "react-router-dom";

const menuItems = ["Overview", "Charts", "Users", "Settings"];

const Sidebar = ({
  isMobile,
  closeMenu,
}: {
  isMobile: boolean;
  closeMenu?: () => void;
}) => {
  const navigate = useNavigate();

  const handleNavigation = (item: string) => {
    if (item === "Overview") navigate("/");
    else if (item === "Users") navigate("/users");
    else if (item === "Charts") navigate("/charts");
    else if (item === "Settings") navigate("/settings");
    if (closeMenu) closeMenu(); // در موبایل بعد از کلیک، منو بسته شود
  };

  if (isMobile) {
    //  (موبایل)

    return (
      <div
        style={{
          padding: "32px 20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#181818", // پس‌زمینه تیره
          color: "#fff", // رنگ همه متن‌ها سفید
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            letterSpacing: "3px",
            marginBottom: "20px",
            color: "#fff", // سفید
          }}
        >
          DASHBOARD
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleNavigation(item)}
              style={{
                padding: "14px 0",
                fontSize: "18px",
                cursor: "pointer",
                borderBottom: "1px solid #262626",
                transition: "0.2s",
                color: "#fff", // سفید
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#262626")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // نمایش دسکتاپ
  return (
    <div
      style={{
        width: "270px",
        background: "#181818",
        color: "#fff",
        padding: "40px 24px",
        borderRadius: "24px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "56px",
          letterSpacing: "3px",
          fontWeight: 700,
          fontSize: "20px",
        }}
      >
        DASHBOARD
      </h2>
      <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => handleNavigation(item)}
            style={{
              textAlign: "center",
              padding: "18px 0",
              fontSize: "19px",
              fontWeight: 500,
              borderBottom: "1px solid #262626",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#262626")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
