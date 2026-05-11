import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;