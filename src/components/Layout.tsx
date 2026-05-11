import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useMediaQuery } from "../hooks/useMediaQuery";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        background: "#0f0f0f",
        padding: isMobile ? "12px" : "24px",
        gap: isMobile ? "12px" : "24px",
      }}
    >
      <Sidebar isMobile={isMobile} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "12px" : "24px",
        }}
      >
        <Topbar />
        <main
          style={{
            flex: 1,
            background: "#1c1c1c",
            borderRadius: "24px",
            padding: isMobile ? "16px" : "32px",
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;