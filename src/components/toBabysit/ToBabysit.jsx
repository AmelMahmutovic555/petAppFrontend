import { useLocation } from "react-router";
import "./style/ToBabysit.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import Footer from "../Footer";

export default function ToBabysit() {
  const [selectedPet, setSelectedPet] = useState(null);

  const { user, apiUrl } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [filterPet, setFilterPet] = useState("both");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [tmpFlag, setTmpFlag] = useState(false);
  const location = useLocation();

  const dialogRef = useRef(null);

  useEffect(() => {
    // if (!user?.userId) return;

    localStorage.setItem("currentPage", location.pathname);

    async function getInfo() {
      try {
        // if (user) {
        const res =
          filterPet && filterPet.toLowerCase() === "both"
            ? await axios.get(
                `${apiUrl}/pets/findByToBabysitUser/${user && parseInt(user.userId)}`,
              )
            : await axios.get(
                `${apiUrl}/pets/findByToBabysitUserAndType/${user && parseInt(user.userId)}/${filterPet && filterPet.toLowerCase()}`,
              );

        setPets(res.data);
        setError(false);
        // }
      } catch (error) {
        setError(true);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }

    setTmpFlag(false);

    getInfo();
  }, [location.pathname, user, apiUrl, filterPet, tmpFlag, setTmpFlag]);

  function openDialog(pet) {
    setSelectedPet(pet);

    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedPet(null);
  }

  async function handleBabysit(e) {
    e.preventDefault();

    if (!selectedPet) return;

    try {
      setLoading(true);
      const updateInfo = {
        name: selectedPet.name,
        age: selectedPet.age,
        phone: selectedPet.phone,
        type: selectedPet.type.toLowerCase(),
        image: selectedPet.image,
        userId: null,
      };
      const res = await axios.put(
        `${apiUrl}/pets/edit/${selectedPet.name}/${selectedPet.age}/${selectedPet.phone}/${selectedPet.type}`,
        updateInfo,
        {
          withCredentials: true,
        },
      );

      if (res.data) {
        setTmpFlag(true);

        dialogRef.current?.close();
      }
    } catch (error) {
      setTmpFlag(true);

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleFilter(event) {
    const { value } = event.target;

    setFilterPet(value);

    if (value === "both") {
      try {
        setLoading(true);
        const res = await axios.get(
          `${apiUrl}/pets/findByToBabysitUser/${user && parseInt(user.userId)}`,
        );
        console.log(res.data);

        // if (res.data) {
        setPets(res.data);
        setError(false);
        setTmpFlag(true);

        // }
      } catch (error) {
        setTmpFlag(true);

        setError(true);
        setPets([]);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await axios.get(
          `${apiUrl}/pets/findByToBabysitUserAndType/${user && parseInt(user.userId)}/${value}`,
        );

        // if (res.data) {
        setPets(res.data);
        setError(false);
        // }
      } catch (error) {
        setError(true);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <>
      <section className="toBabysitParent">
        <div className="yourPetsFirstChild">
          <p>Filter By:</p>
          <select value={filterPet} onChange={handleFilter}>
            <option value={"both"}>Both</option>
            <option value={"dog"}>Dogs</option>
            <option value={"cat"}>Cats</option>
          </select>
        </div>
        <div className="petsSecondChild">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <p className="errorMessage">You do not have any pets to babysit.</p>
          ) : (
            pets.map((p) => (
              <div key={p.id}>
                <img src={p.image} alt="pets" width={300} height={200} />

                <div className="petsInformation">
                  <p className="petName">{p.name}</p>
                  <p>📅 Age: {p.age}</p>

                  <button
                    className="removeBabysit"
                    onClick={() => openDialog(p)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))
          )}

          <dialog id="dialog" ref={dialogRef}>
            <div>
              <button id="xBtn" onClick={closeDialog}>
                X
              </button>

              <h3>
                Are you sure you want to remove {selectedPet?.name} from your
                pets list?
              </h3>

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
        </div>
      </section>

      <Footer />
    </>
  );
}
