const Topbar = () => {
  return (
    <div
      style={{
        height: "64px",
        background: "#1a1a1a",
        borderRadius: "20px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: "18px", fontWeight: 600 }}>
        Dashboard
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "14px",
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