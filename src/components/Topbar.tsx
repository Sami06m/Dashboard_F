import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAuth } from "../context/AuthContext";
import { avatarGallery } from "../data/Avatars";

const Topbar = ({
  isMobile,
  toggleMenu,
}: {
  isMobile: boolean;
  toggleMenu?: () => void;
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobileDevice = useMediaQuery("(max-width: 768px)");
  const mobile = isMobile !== undefined ? isMobile : isMobileDevice;

  const avatar = user?.avatarId
    ? avatarGallery.find((a) => a.id === user.avatarId)
    : avatarGallery[0];

  return (
    <div
      style={{
        height: mobile ? "56px" : "64px",
        background: "#1a1a1a",
        borderRadius: "20px",
        padding: mobile ? "0 16px" : "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {mobile && toggleMenu && (
          <button
            onClick={toggleMenu}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              width: "32px",
              height: "32px",
            }}
          >
            ☰
          </button>
        )}
        <div style={{ fontSize: mobile ? "16px" : "18px", fontWeight: 600 }}>
          Dashboard
        </div>
      </div>

      <div
        onClick={() => navigate("/profile")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: mobile ? "28px" : "32px",
            height: mobile ? "28px" : "32px",
            borderRadius: "50%",
            backgroundColor: avatar?.bgColor || "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: mobile ? "14px" : "16px",
          }}
        >
          {avatar?.icon || "👨"}
        </div>
        <span style={{ fontSize: mobile ? "12px" : "14px" }}>Profile</span>
      </div>
    </div>
  );
};

export default Topbar;
