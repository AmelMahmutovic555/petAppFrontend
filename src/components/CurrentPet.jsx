import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./style/CurrentPet.css";
import { AuthContext } from "../authContext/AuthContext";
export default function CurrentPet() {
  const [pet, setPet] = useState({});
  // const [loading, setLoading] = useState(true);

  const { name } = useParams();

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
        // setLoading(false);
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
      const res = await axios.put(`${apiUrl}/pets/add/${name}`, babysitInfo, {
        withCredentials: true,
      });
      if (res.data) {
        console.log(res.data);
        setSuccessBabysit(
          "Successfully applied to babysit " +
            pet.name +
            ", you will be contacted soon.",
        );
        navigate("/pets", {
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
        <div>
          <img src={pet?.image} alt="pet" className="petImg" />
          <div className="petInfo">
            <p>{pet?.name}</p>
            <p>Age: {pet?.age}</p>
            <p>Contact: {pet?.phone}</p>
            {/* <Link to={`/`} className="babysitLink"> */}
            <button className="babysitBtn" id="babysitBtn" onClick={openDialog}>
              Babysit
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
      </section>
    </>
  );
}
