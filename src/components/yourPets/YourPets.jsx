import { useContext, useEffect, useRef, useState } from "react";
import "./style/YourPets.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useLocation } from "react-router";
import Footer from "../Footer";

export default function YourPets() {
  const [petInfo, setPetInfo] = useState({
    name: "",
    age: "",
    phone: "",
    type: "Dog",
    image: "",
  });
  const [selectedPet, setSelectedPet] = useState(null);

  const { user, apiUrl } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();

  const dialogRef = useRef(null);
  const dialogRefUpdate = useRef(null);

  useEffect(() => {
    // if (!user?.userId) return;
    localStorage.setItem("currentPage", location.pathname);

    async function getInfo() {
      try {
        // if (user) {
        const res = await axios.get(
          `${apiUrl}/pets/findByUser/${parseInt(user && user.userId)}`,
        );

        setPets(res.data);
        // }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    // if (user) {
    getInfo();
    // }
  }, [location.pathname, user, apiUrl, pets, setPets]);

  function handleChange(e) {
    const { value, name } = e.target;
    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function openDialog(pet) {
    setSelectedPet(pet);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedPet(null);
  }

  function openDialogUpdate(pet) {
    setSelectedPet(pet);

    setPetInfo({
      name: pet.name,
      age: pet.age,
      phone: pet.phone,
      type: pet.type,
      image: pet.image,
    });

    dialogRefUpdate.current?.showModal();
  }

  function closeDialogUpdate() {
    dialogRefUpdate.current?.close();
    setSelectedPet(null);
  }

  async function handleBabysit(e) {
    e.preventDefault();

    if (!selectedPet) return;

    try {
      const res = await axios.delete(
        `${apiUrl}/pets/delete/${selectedPet.name}/${selectedPet.age}/${selectedPet.phone}/${selectedPet.type}`,
        {
          withCredentials: true,
        },
      );
      // if (res.data) {
      //   setSuccessMessage(res.data);
      // }

      // setPets((prevPets) =>
      //   prevPets.filter((pet) => pet.id !== selectedPet.id),
      // );

      // closeDialog();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleBabysitUpdate(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const updateInfo = {
        name: petInfo.name,
        age: petInfo.age,
        phone: petInfo.phone,
        type: petInfo.type,
        image: petInfo.image,
        userId: user?.userId,
      };

      await axios.put(
        `${apiUrl}/pets/edit/${selectedPet.name}/${selectedPet.age}/${selectedPet.phone}/${selectedPet.type}`,
        updateInfo,
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="yourPetsParent">
        <div className="petsSecondChild">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <p className="errorMessage">You did not add any pets.</p>
          ) : (
            pets.map((p) => (
              <div key={p.id}>
                <img src={p.image} alt="pets" width={300} height={200} />

                <div className="petsInformation" key={p.id}>
                  <p className="petName">{p.name}</p>
                  <p>📅 Age: {p.age}</p>
                  <div className="yourPetsInfo" key={p.id}>
                    <button
                      className="changeInfo"
                      onClick={() => openDialogUpdate(p)}
                    >
                      Change Info
                    </button>
                    <button className="remove" onClick={() => openDialog(p)}>
                      Remove
                    </button>
                  </div>
                </div>

                <dialog key={p.id} id="dialog" ref={dialogRefUpdate}>
                  <div>
                    <button id="xBtn" onClick={closeDialogUpdate}>
                      X
                    </button>
                    <form
                      className="petFormInfo"
                      onSubmit={handleBabysitUpdate}
                    >
                      <label id="updatePetInfo1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={petInfo.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter pets name"
                      />
                      <label id="updatePetInfo2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={petInfo.age}
                        onChange={handleChange}
                        required
                        placeholder="Enter pets age"
                      />
                      <label id="updatePetInfo3">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={petInfo.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                      />
                      <label id="updatePetInfo4">Type</label>
                      <select
                        className="selectPet"
                        name="type"
                        value={petInfo.type}
                        onChange={handleChange}
                        required
                      >
                        <option>Dog</option>
                        <option>Cat</option>
                      </select>
                      <label id="updatePetInfo5">Image</label>
                      <input
                        type="file"
                        name="image"
                        className="petFileImage"
                        value={petInfo.image}
                        onChange={handleChange}
                      />
                      <button type="submit" className="petFormSubmit">
                        Submit
                      </button>
                    </form>
                  </div>
                </dialog>

                <dialog key={p.id} id="dialog" ref={dialogRef}>
                  <div>
                    <button id="xBtn" onClick={closeDialog}>
                      X
                    </button>
                    <h3>
                      Are you sure you want to remove{" "}
                      {selectedPet && selectedPet.name} from your pets list?
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
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
