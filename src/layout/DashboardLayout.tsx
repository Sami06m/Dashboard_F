import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = (): JSX.Element => {
  const [IsOpen , setIsOpen] = useState <Boolean>(false)
  const location = useLocation();
  const opensidebar = (): void =>{
    setIsOpen(IsOpen)
  }
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: "grey.900",
          color: "white",
          p: 2,
        }}
      >
        Sidebar
      </Box>

      {/* Main area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            height: 64,
            bgcolor: "grey.100",
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            px: 2,
          }}
        >
          Header
        </Box>

        {/* Page content */}
        <Box sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;