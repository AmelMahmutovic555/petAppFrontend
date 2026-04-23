import { Link, useLocation, useNavigate } from "react-router";
import "./style/Navbar.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../authContext/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // const [user, setUser] = useState(null);
  // const [sidebar, setSidebar] = useState(false);
  // const [loading, setLoading] = useState(true);

  const { user, setUser, apiUrl, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("currentPage", location.pathname);
    console.log(user);
  }, [location.pathname]);

  // function handleSidebar() {
  //   setSidebar((prevState) => !prevState);
  // }

  // if (loading) {
  // return <p>Loading...</p>;
  // }

  return (
    <>
      <header className="navbarHeader">
        <nav className="animalNavbar">
          <div className="firstChildNavbar">
            <Link to={"/"}>
              <p>PetCare Match</p>
            </Link>
          </div>

          <ul>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/pets"}>
              <li>Pets</li>
            </Link>

            {user ? (
              <button className="btnAuthLogout" onClick={handleLogout}>
                <li>Logout</li>
              </button>
            ) : (
              <>
                <Link to={"/login"} className="btnAuth">
                  <li>Login</li>
                </Link>
                <Link to={"/signup"} className="btnAuth">
                  <li>Signup</li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
