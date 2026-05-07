import { useEffect } from "react";
import Blog from "./Blog.jsx";
import "./style/Home.css";
// import axios from "axios";
import Footer from "./Footer.jsx";
import { useLocation } from "react-router";
import Navbar from "./Navbar.jsx";

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("currentLocation", location.pathname);
  }, [location.pathname]);
  return (
    <>
      <section className="homeParent">
        <Navbar />
        <article id="homeChild">
          <div className="homeFirstChild">
            <h1 className="WelcomePetCareHeading">Welcome To PetCare Match</h1>
            <p>A digital activist, Writer and Consultant.</p>
          </div>
        </article>
      </section>

      <Blog />

      <Footer />
    </>
  );
}
