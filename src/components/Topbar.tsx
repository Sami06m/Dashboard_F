import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

// لیست آواتارها (همان گالری) – برای تطابق رنگ و آیکون
const avatarGallery = [
  { id: 1, bgColor: "#3b82f6", icon: "👨", label: "Male" },
  { id: 2, bgColor: "#ec489a", icon: "👩", label: "Female" },
  { id: 3, bgColor: "#f59e0b", icon: "❤️", label: "Heart" },
  { id: 4, bgColor: "#8b5cf6", icon: "⭐", label: "Star" },
  { id: 5, bgColor: "#06b6d4", icon: "🐱", label: "Cat" },
  { id: 6, bgColor: "#84cc16", icon: "🌿", label: "Nature" },
  { id: 7, bgColor: "#eab308", icon: "☀️", label: "Sun" },
  { id: 8, bgColor: "#1e3a8a", icon: "🌙", label: "Moon" },
];

const Topbar = ({
  isMobile,
  toggleMenu,
}: {
  isMobile: boolean;
  toggleMenu?: () => void;
  isMenuOpen?: boolean;
}) => {
  const navigate = useNavigate();
  const isMobileDevice = useMediaQuery("(max-width: 768px)");
  const mobile = isMobile !== undefined ? isMobile : isMobileDevice;
  const [avatar, setAvatar] = useState<{ bgColor: string; icon: string } | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      const savedAvatarId = localStorage.getItem(`avatarId_${user.id}`);
      let avatarId = savedAvatarId ? parseInt(savedAvatarId) : (user.gender === "female" ? 2 : 1);
      const found = avatarGallery.find(a => a.id === avatarId);
      if (found) setAvatar({ bgColor: found.bgColor, icon: found.icon });
    }
  }, []);

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
        {/* دایره آواتار کوچک */}
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