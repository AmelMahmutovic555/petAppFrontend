import { Routes, Route, Outlet } from "react-router";
// import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Pets from "./components/Pets.jsx";
import CurrentPet from "./components/CurrentPet.jsx";
// import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
// import Home from "./components/Home.jsx"
import "./index.css";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <AppLayout />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* </Route> */}

        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:name" element={<CurrentPet />} />

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}
