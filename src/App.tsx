import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CreateUser from "./pages/Createuser";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Charts from "./pages/Charts";
import ProtectedRoute from "./components/ProtectedRoute";
import { defaultUsers } from "./data/defaultUsers";
import Profile from "./pages/profile";


function App() {
  useEffect(() => {
    const existingUsers = localStorage.getItem("users");
    if (!existingUsers) {
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Layout><Users /></Layout></ProtectedRoute>} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
          <Route path="/charts" element={<ProtectedRoute><Layout><Charts /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;