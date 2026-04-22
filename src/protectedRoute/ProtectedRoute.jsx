import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}
