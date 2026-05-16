import { useLocation } from "react-router";
import "./style/Navbar.css";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { AuthContext } from "../authContext/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { user, handleLogout } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem("currentPage", location.pathname);
    console.log(user);
  }, [location.pathname, user]);

  function handleSidebar() {
    setSidebar((prevState) => !prevState);
  }

  return (
    <>
      <header className="navbarHeader">
        <nav className="animalNavbar">
          <div className="firstChildNavbar">
            <a href={"/"}>
              <p>PetCare Match</p>
            </a>
          </div>

          {window.innerWidth < 590 ? (
            <button className="hamburger" onClick={handleSidebar}>
              {sidebar ? "✕" : "☰"}
            </button>
          ) : (
            <ul>
              <a href={"/"}>
                <li>Home</li>
              </a>
              <a href={"/pets"}>
                <li>Pets</li>
              </a>
              <a href={"/addPet"}>
                <li>Add Pet</li>
              </a>

              <a href={"/yourPets"}>
                <li>Your Pets</li>
              </a>

              <a href={"/toBabysit"}>
                <li>Pets To Babysit</li>
              </a>

              {user ? (
                <button className="btnAuthLogoutSidebar" onClick={handleLogout}>
                  <li>Logout</li>
                </button>
              ) : (
                <>
                  <a href={"/login"} className="btnAuth">
                    <li>Login</li>
                  </a>
                  <a href={"/signup"} className="btnAuth">
                    <li>Signup</li>
                  </a>
                </>
              )}
            </ul>
          )}
        </nav>
        {sidebar && (
          <div id="sidebar">
            <ul>
              <a href={"/"}>
                <li>Home</li>
              </a>
              <a href={"/pets"}>
                <li>Pets</li>
              </a>
              <a href={"/addPet"}>
                <li>Add Pet</li>
              </a>
              <a href={"/yourPets"}>
                <li>Your Pets</li>
              </a>

              <a href={"/toBabysit"}>
                <li>Pets To Babysit</li>
              </a>

              {user ? (
                <button className="btnAuthLogoutSidebar" onClick={handleLogout}>
                  <li>Logout</li>
                </button>
              ) : (
                <>
                  <a href={"/login"} className="btnAuthSidebar">
                    <li>Login</li>
                  </a>
                  <a href={"/signup"} className="btnAuthSidebar">
                    <li>Signup</li>
                  </a>
                </>
              )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
