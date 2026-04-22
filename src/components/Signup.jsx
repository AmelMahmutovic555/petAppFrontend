import { useContext, useState } from "react";
import "./style/Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
export default function Signup() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { apiUrl } = useContext(AuthContext);

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
        const res = await axios.post(`${apiUrl}/user/register`, data, {
          withCredentials: true,
        });

        console.log(res.data);

        if (res.data) {
          navigate("/login");
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
    window.location.href = `${apiUrl}/user/google-login`;
  }

  return (
    <>
      <section className="signupContainer">
        <div className="signupContainerChild">
          <form className="signupForm" onSubmit={handleSubmit}>
            <label>Enter your Name:</label>
            <input
              type="text"
              name="name"
              value={formInfo.name}
              onChange={handleChange}
              required
            />
            <label>Enter your Surname:</label>
            <input
              type="text"
              name="surname"
              value={formInfo.surname}
              onChange={handleChange}
              required
            />

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
              Already have an account? <Link to={"/login"}>Log In Here</Link>
            </p>
            <p>-----OR-----</p>

            {/* <div> */}
            <button onClick={handleGoogle} className="googleBtn">
              <img src="/googleIcon.jpg" alt="google" width={50} height={50} />
              Sign In with Google
            </button>
            {/* </div> */}
          </form>
        </div>
      </section>
    </>
  );
}
