import { useContext, useEffect, useState } from "react";
import "./style/Signup.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
import Navbar from "./Navbar";
export default function Login() {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

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
        email: formInfo.email,
        password: formInfo.password,
      };
      try {
        const res = await axios.post(`${apiUrl}/user/login`, data, {
          withCredentials: true,
        });

        // console.log(res.data)

        if (res.data) {
          localStorage.setItem("user", "User Exists");
          const current =
            localStorage.getItem("currentLocation") !== null
              ? localStorage.getItem("currentLocation")
              : null;

          console.log(typeof current);
          // localStorage.setItem("userInfo", res.data?.token)
          navigate(localStorage.getItem("currentLocation"), { replace: true });
        }
      } catch (error) {
        console.error(error);
      } finally {
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
        <Navbar />
        <article className="signupArticle">
          <div className="signupContainerChild">
            <form className="signupForm" onSubmit={handleSubmit}>
              <label>Enter your Email:</label>
              <input
                type="email"
                name="email"
                value={formInfo.email}
                onChange={handleChange}
                required
              />

              <label>Enter your Password:</label>
              <input
                type="password"
                name="password"
                value={formInfo.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
              <p>
                Don't have an account? <Link to={"/signup"}>Sign Up Here</Link>
              </p>
              <p>-----OR-----</p>
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
