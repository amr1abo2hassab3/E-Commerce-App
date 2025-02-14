import { Navigate } from "react-router-dom";

export const ProtectedAuth = ({ children }) => {
  if (localStorage.getItem("token") !== null) return <Navigate to={"/"} />;
  return children;
};
