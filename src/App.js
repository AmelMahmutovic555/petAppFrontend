import { Routes, Route, Outlet } from "react-router";
// import { Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Pets from "./components/Pets.jsx";
import CurrentPet from "./components/CurrentPet.jsx";
// import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
// import Home from "./components/Home.jsx"
import "./index.css";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import AddPet from "./components/addPet/AddPet.jsx";
import ToBabysit from "./components/toBabysit/ToBabysit.jsx";
import YourPets from "./components/yourPets/YourPets.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import PetsRoute from "./protectedRoute/PetsRoute.jsx";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {/* <BrowserRouter> */}
      <AppLayout />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PetsRoute />}>
          <Route path="/yourPets" element={<YourPets />} />
          <Route path="/toBabysit" element={<ToBabysit />} />
        </Route>

        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:name/:age/:phone/:type" element={<CurrentPet />} />
        <Route path="/addPet" element={<AddPet />} />

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}
