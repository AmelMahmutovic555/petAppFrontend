import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Navbar from "./Navbar.jsx";
import "./style/CurrentPet.css";
import { AuthContext } from "../authContext/AuthContext";
import Footer from "./Footer";
export default function CurrentPet() {
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(true);

  const { name, age, phone, type } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const dialogRef = useRef(null);

  const { apiUrl } = useContext(AuthContext);

  const {
    user,
    // successBabysit,
    setSuccessBabysit,
    // assignedPet,
    // setAssignedPet,
  } = useContext(AuthContext);

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get(`${apiUrl}/pets/byPet/${name}`);

        if (res.data) {
          setPet(res.data);
        } else {
          setPet(null);
        }
      } catch (error) {
        console.error(error);
        setPet(null);
      } finally {
        setLoading(false);
      }
    }

    getInfo();
  }, [location.pathname, apiUrl, name]);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  async function handleBabysit() {
    if (!user) {
      localStorage.setItem("currentLocation", location.pathname);
      navigate("/login", { replace: true });
      return;
    }
    localStorage.removeItem("currentLocation");
    try {
      // if(pet){
      const babysitInfo = {
        name: pet?.name,
        age: pet?.age,
        phone: pet?.phone,
        type: pet?.type,
        userId: user?.userId,
      };
      // console.log(pet?.name)
      // }
      const res = await axios.put(
        `${apiUrl}/pets/edit/${name}/${age}/${phone}/${type}`,
        babysitInfo,
        {
          withCredentials: true,
        },
      );
      if (res.data) {
        setSuccessBabysit(
          "Successfully applied to babysit " +
            pet.name +
            ", you will be contacted soon.",
        );
        navigate("/toBabysit", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  return (
    <>
      <section className="currPetParent">
        {/* <Navbar /> */}
        {loading ? (
          <p className="loading">
            <img src="/loading.gif" alt="loading" width={70} height={70} />
          </p>
        ) : (
          <>
            <div id="currPetChild">
              <img src={pet.imageUrl} alt="pet" className="petImg" />
              <div className="petInfo">
                <p className="petName">{pet.name}</p>
                <p>📅 Age: {pet.age}</p>
                <p>📞 Contact: {pet.phone}</p>
                {/* <Link to={`/`} className="babysitLink"> */}
                <button
                  className="babysitBtn1"
                  id="babysitBtn"
                  onClick={openDialog}
                >
                  {pet.type === "cat" ? "🐱" : "🐾"} Babysit
                </button>
                {/* </Link> */}
              </div>
            </div>
            <dialog id="dialog" ref={dialogRef}>
              <div>
                <button id="xBtn" onClick={closeDialog}>
                  X
                </button>
                <h3>Are you sure you want to apply to babysit {pet?.name}?</h3>
                <div>
                  <button id="yesBtn" onClick={handleBabysit}>
                    Yes
                  </button>
                  <button id="noBtn" onClick={closeDialog}>
                    No
                  </button>
                </div>
              </div>
            </dialog>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
