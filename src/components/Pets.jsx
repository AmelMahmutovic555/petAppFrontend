import "./style/Pets.css";
import { Link, useLocation } from "react-router";
import Footer from "./Footer.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authContext/AuthContext.jsx";
export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState("both");
  const location = useLocation();

  const {
    successBabysit,
    setSuccessBabysit,
    assignedPet,
    setAssignedPet,
    apiUrl,
  } = useContext(AuthContext);
  useEffect(() => {
    localStorage.setItem("currentPage", location.pathname);

    async function getInfo() {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/pets`);
        if (res.data) {
          setPets(res.data);
        } else {
          setPets([]);
        }
      } catch (error) {
        console.error(error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }

    const current = localStorage.getItem("currentLocation");

    // if (!current.startsWith("/pets/")) {
    //   setSuccessBabysit("");
    // }

    getInfo();
  }, [location.pathname]);

  async function handleChange(event) {
    const { value } = event.target;
    setSelectedValue(value);

    if (value === "both") {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/pets`);
        if (res.data) {
          setPets(res.data);
        } else {
          setPets([]);
        }
      } catch (error) {
        console.error(error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    } else if (value === "cat") {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/pets/byType/cat`);
        if (res.data) {
          setPets(res.data);
        } else {
          setPets([]);
        }
      } catch (error) {
        console.error(error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/pets/byType/dog`);
        if (res.data) {
          setPets(res.data);
        } else {
          setPets([]);
        }
      } catch (error) {
        console.error(error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }
  }

  // if (loading) {
  //     return <p>Loading...</p>;
  // }

  return (
    <>
      <section className="petsParent">
        {successBabysit.length > 0 ? (
          <p className="successBabysit">{successBabysit}</p>
        ) : (
          ""
        )}

        <div className="petsFirstChild">
          <div>
            <p>Available Pets</p>
          </div>

          <select value={selectedValue} onChange={handleChange}>
            <option value={"both"}>Both</option>
            <option value={"dog"}>Dogs</option>
            <option value={"cat"}>Cats</option>
          </select>
        </div>

        <div className="petsSecondChild">
          {loading ? (
            <p>Loading...</p>
          ) : (
            pets.map((p) => {
              if (p.userId !== null) {
                return (
                  <div key={p.id} className="foundBabysitterParent">
                    <p className="foundBabysitter">Found a Babysitter!</p>
                    <img src={p.image} alt="pets" width={300} height={200} />
                    <p>{p.name}</p>
                    <p>Age: {p.age}</p>
                    <p>Contact Number: {p.phone}</p>
                    <Link className="babysitLink">
                      <button className="babysitBtn" disabled>
                        Babysit
                      </button>
                    </Link>
                  </div>
                );
              }

              return (
                <div key={p.id}>
                  <img src={p.image} alt="pets" width={300} height={200} />
                  <p>{p.name}</p>
                  <p>Age: {p.age}</p>

                  <p>Contact Number: {p.phone}</p>
                  <Link to={`/pets/${p.name}`} className="babysitLink">
                    <button className="babysitBtn">Babysit</button>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* <Footer/> */}
    </>
  );
}
