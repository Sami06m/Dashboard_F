import { useNavigate } from "react-router-dom";

const menuItems: string[] = [
  "Overview",
  "Analytics",
  "Charts",
  "Users",
  "Settings",
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (item: string) => {
  console.log("Navigating to:", item);
  if (item === "Settings") navigate("/settings");
  if (item === "Charts") navigate("/charts");
  if (item === "Overview") {
    window.location.href = "/";
  } else if (item === "Users") {
    window.location.href = "/users";
  }
};

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

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "100%",
        }}
      >
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
};

export default Sidebar;