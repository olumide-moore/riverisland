import { Navigate } from "react-router-dom";

const RequireNoAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? <Navigate to="/myaccount" replace /> : children;
};

export default RequireNoAuth;
