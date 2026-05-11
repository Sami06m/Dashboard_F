import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CreateUser from "./pages/Createuser";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Charts from "./pages/Charts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/charts" element={<Layout><Charts /></Layout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;