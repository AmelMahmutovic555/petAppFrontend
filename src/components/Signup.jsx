import { useContext, useEffect, useState } from "react";
import "./style/Signup.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
// import Navbar from "./Navbar";
export default function Signup() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { apiUrl } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem("user");
  }, [location.pathname]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    async function addData() {
      const data = {
        name: formInfo.name,
        surname: formInfo.surname,
        email: formInfo.email,
        password: formInfo.password,
      };
      try {
        setLoading(true);
        const res = await axios.post(`${apiUrl}/user/register`, data, {
          withCredentials: true,
        });

        console.log(res.data);

        if (res.data) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
        // setFormInfo("")
      }
    }

    addData();
  }

  function handleGoogle() {
    localStorage.setItem("user", "User Exists");
    window.location.href = `${apiUrl}/user/google-login`;
  }

  return (
    <>
      <section className="signupContainer">
        <div>
          <button className="backBtn">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="54"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1" />
              </svg>
            </Link>
          </button>
        </div>
        {/* <Navbar /> */}
        <article className="signupArticle">
          <div className="signupContainerChild" id="signupContainerChild">
            <div className="welcomeBack">
              <p className="wb2">Start your journey</p>
              <p className="wb1">Sign Up to PetCare Match</p>
            </div>
            {error ? <div className="userError">User already exists!</div> : ""}

            <form className="signupForm" onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formInfo.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
              <label>Surname</label>
              <input
                type="text"
                name="surname"
                value={formInfo.surname}
                onChange={handleChange}
                required
                placeholder="Enter your surname"
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formInfo.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formInfo.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              {loading ? (
                <button disabled id="disabledAuthBtn">
                  <img
                    src="/loading.gif"
                    alt="loading"
                    width={25}
                    height={25}
                  />
                </button>
              ) : (
                <button type="submit">Submit</button>
              )}
              <p>
                Already have an account? <Link to={"/login"}>Log In Here</Link>
              </p>
              <p id="or">OR</p>
              {/* <div> */}
              <button onClick={handleGoogle} className="googleBtn">
                <img
                  src="/googleIcon.jpg"
                  alt="google"
                  width={50}
                  height={50}
                />
                Sign In with Google
              </button>
              {/* </div> */}
            </form>
          </div>
        </article>
      </section>
    </>
  );
}
