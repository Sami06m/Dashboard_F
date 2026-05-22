import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAuth } from "../context/AuthContext";
import { avatarGallery } from "../data/Avatars";

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateAvatar } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedAvatar(user.avatarId || (user.gender === "female" ? 2 : 1));
  }, [user, navigate]);

  const selectAvatar = (avatarId: number) => {
    setSelectedAvatar(avatarId);
    updateAvatar(avatarId);
    setShowGallery(false);
  };

  if (!user) return null;
  const currentAvatar =
    avatarGallery.find((a) => a.id === selectedAvatar) || avatarGallery[0];

  return (
    <div
      style={{
        color: "#fff",
        maxWidth: "600px",
        margin: "0 auto",
        padding: isMobile ? "0 16px" : "0",
      }}
    >
      <h1
        style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}
      >
        My Profile
      </h1>

      <div
        style={{
          background: "#1c1c1c",
          borderRadius: "24px",
          padding: isMobile ? "24px" : "32px",
          border: "1px solid #2a2a2a",
          textAlign: "center",
        }}
      >
        <div
          onClick={() => setShowGallery(true)}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: currentAvatar.bgColor,
            margin: "0 auto 20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "64px",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {currentAvatar.icon}
        </div>
        <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "24px" }}>
          Click on avatar to change
        </p>

        {showGallery && (
          <>
            <div
              onClick={() => setShowGallery(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                zIndex: 1000,
              }}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#1c1c1c",
                borderRadius: "24px",
                padding: "24px",
                zIndex: 1001,
                width: "90%",
                maxWidth: "400px",
                border: "1px solid #333",
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                Choose Avatar
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
                  gap: "16px",
                }}
              >
                {avatarGallery.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => selectAvatar(avatar.id)}
                    style={{
                      backgroundColor: avatar.bgColor,
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "36px",
                      cursor: "pointer",
                      border:
                        selectedAvatar === avatar.id
                          ? "3px solid white"
                          : "none",
                      transition: "0.2s",
                    }}
                  >
                    {avatar.icon}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="btn-secondary"
                style={{
                  marginTop: "24px",
                  width: "100%",
                  padding: "8px 16px",
                  fontSize: "14px",
                }}
              >
                Close
              </button>
            </div>
          </>
        )}

        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <strong>First Name:</strong> {user.fname || "-"}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <strong>Last Name:</strong> {user.lname || "-"}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <strong>Email:</strong> {user.email || "-"}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <strong>Gender:</strong> {user.gender || "-"}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <strong>Age:</strong> {user.age || "-"}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <strong>Role:</strong>{" "}
            {user.role === "admin" ? "Administrator" : "Regular User"}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: user.status === "active" ? "#4caf50" : "#f44336",
              }}
            >
              {user.status === "active" ? "Active" : "Deactive"}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="btn-primary"
          style={{
            marginTop: "24px",
            padding: "10px 24px",
            fontSize: "14px",
            width: "auto",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
