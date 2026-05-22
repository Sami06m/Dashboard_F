import { type ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useMediaQuery } from "../hooks/useMediaQuery";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0f0f0f",
        padding: isMobile ? "12px" : "24px",
        gap: isMobile ? "12px" : "24px",
        position: "relative",
      }}
    >
      {/* دسکتاپ */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "24px", flex: 1 }}>
          <Sidebar isMobile={false} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Topbar isMobile={false} toggleMenu={toggleMenu} />
            <main
              style={{
                flex: 1,
                background: "#1c1c1c",
                borderRadius: "24px",
                padding: "32px",
                overflow: "auto",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      )}

      {/* موبایل (بدون سایدبار ثابت) */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "12px",
          }}
        >
          <Topbar isMobile={true} toggleMenu={toggleMenu} />
          <main
            style={{
              flex: 1,
              background: "#1c1c1c",
              borderRadius: "24px",
              padding: "16px",
              overflow: "auto",
            }}
          >
            {children}
          </main>
        </div>
      )}

      {/* Drawer سایدبار در موبایل */}
      {isMobile && isMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 1000,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "70%",
              maxWidth: "280px",
              height: "100%",
              backgroundColor: "#181818",
              zIndex: 1001,
              transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s ease",
              boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
            }}
          >
            <Sidebar isMobile={true} closeMenu={closeMenu} />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
