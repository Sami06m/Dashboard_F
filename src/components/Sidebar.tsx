import { useNavigate } from "react-router-dom";

const menuItems = ["Overview", "Charts", "Users", "Settings"];

const Sidebar = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();

  const handleNavigation = (item: string) => {
    if (item === "Overview") navigate("/");
    else if (item === "Users") navigate("/users");
    else if (item === "Charts") navigate("/charts");
    else if (item === "Settings") navigate("/settings");
  };

  return (
    <div
      style={{
        width: isMobile ? "100%" : "270px",
        background: "#181818",
        color: "#fff",
        padding: isMobile ? "12px 16px" : "40px 24px",
        borderRadius: "24px",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: "center",
        justifyContent: isMobile ? "space-between" : "flex-start",
        gap: isMobile ? "8px" : "0",
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          marginBottom: isMobile ? 0 : "56px",
          fontSize: isMobile ? "16px" : "20px",
          letterSpacing: "3px",
        }}
      >
        DASHBOARD
      </h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          gap: isMobile ? "8px" : "0",
          width: "100%",
          justifyContent: isMobile ? "space-around" : "center",
        }}
      >
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => handleNavigation(item)}
            style={{
              textAlign: "center",
              padding: isMobile ? "8px 12px" : "18px 0",
              fontSize: isMobile ? "14px" : "19px",
              fontWeight: 500,
              borderBottom: isMobile ? "none" : "1px solid #262626",
              cursor: "pointer",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#262626")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;