import { useContext, useEffect } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PetsRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
