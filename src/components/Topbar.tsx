import { useMediaQuery } from "../hooks/useMediaQuery";

const Topbar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      style={{
        height: isMobile ? "56px" : "64px",
        background: "#1a1a1a",
        borderRadius: "20px",
        padding: isMobile ? "0 16px" : "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: 600 }}>
        Dashboard
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "8px" : "16px",
          fontSize: isMobile ? "12px" : "14px",
          opacity: 0.9,
          cursor: "pointer",
        }}
      >
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Topbar;