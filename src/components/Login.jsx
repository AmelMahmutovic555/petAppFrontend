import { useContext, useEffect, useState } from "react";
import "./style/Signup.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
// import Navbar from "./Navbar";
export default function Login() {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { apiUrl } = useContext(AuthContext);

  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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

  function onSubmit() {
    async function addData() {
      const data = {
        email: formInfo.email,
        password: formInfo.password,
      };
      try {
        setLoading(true);
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
        setError(true);

        console.error(error);
      } finally {
        setLoading(false);
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
              <p className="wb1">Welcome back</p>
              <p className="wb2">Please enter your details</p>
            </div>
            {error ? <div className="userError">Wrong credentials!</div> : ""}
            <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="emailUser">
                <label>Email</label>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formInfo.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email",
                      },
                      onChange: handleChange,
                    })}
                    // required
                    placeholder="Enter your email"
                  />

                  {errors.email && (
                    <div className="userErrorMessage">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="passwordUser">
                <label>Password</label>

                <div>
                  <input
                    type="password"
                    name="password"
                    value={formInfo.password}
                    {...register("password", {
                      required: "Password is required",

                      onChange: handleChange,
                    })}
                    placeholder="Enter your password"
                  />

                  {errors.password && (
                    <div className="userErrorMessage">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>

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
                Don't have an account? <Link to={"/signup"}>Sign Up Here</Link>
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
