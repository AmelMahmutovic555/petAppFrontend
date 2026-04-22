import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "./style/Blog.css";

export default function Blog() {
  // const [isOver, setIsOver] = useState(false);
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("currentLocation", location.pathname);
  }, []);
  return (
    <>
      <section className="blogParent">
        <div>
          <img
            src="https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/2/2020/08/shutterstock_456754270-2.jpg"
            alt="puppy1"
          />
        </div>
        <div>
          <h2 className="apply">How to apply</h2>
          <p className="applyText">
            Click on the Pets link in the navigation bar
          </p>
          <p className="or">Or</p>
          <Link to={"/pets"} className="petsBtn">
            <button>Click Here</button>
          </Link>
        </div>
      </section>
    </>
  );
}
