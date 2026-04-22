import { useEffect, useState } from "react";
import Blog from "./Blog.jsx";
import "./style/Home.css";
import axios from "axios";
import Footer from "./Footer.jsx";
import { useLocation } from "react-router";

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("currentLocation", location.pathname);
  }, []);
  return (
    <>
      <section className="homeParent">
        <div className="homeFirstChild">
          <h1 className="WelcomePetCareHeading">Welcome To PetCare Match</h1>
          <p>A digital activist, Writer and Consultant.</p>
        </div>

        <div className="homeSecondChild">
          <div>
            <img
              src="https://i0.wp.com/sweetandpetite.me/wp-content/uploads/2018/11/Hudson.jpg"
              alt="puppy1"
              width={200}
              height={200}
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHl8ZW58MHx8MHx8fDA%3D"
              alt="puppy1"
              width={200}
              height={200}
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHVwcHl8ZW58MHx8MHx8fDA%3D"
              alt="puppy1"
              width={200}
              height={200}
            />
          </div>

          <div>
            <img
              src="https://s3-prod.dogtopia.com/wp-content/uploads/2019/03/0-570x380.jpg"
              alt="puppy1"
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>

      <Blog />

      <Footer />
    </>
  );
}
