import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import "./style/Blog.css";

export default function Blog() {
  // const [isOver, setIsOver] = useState(false);
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("currentLocation", location.pathname);
  }, [location.pathname]);
  return (
    <>
      <section className="blogParent">
        {/* <div>
          <img src="/catThinking.jpg" alt="puppy1" />
        </div> */}
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
