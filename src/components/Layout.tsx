import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0f0f0f",
        padding: "24px",
        gap: "24px",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Topbar />

        <main
  style={{
    flex: 1,
    background: "#1c1c1c",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
    overflow: "auto",
  }}>
  {children}
</main>
      </div>
    </div>
  );
};

export default Layout;