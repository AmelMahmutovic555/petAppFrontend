import "./style/Pets.css";
import { Link, useLocation } from "react-router";
// import Footer from "./Footer.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authContext/AuthContext.jsx";
// import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState("both");
  const location = useLocation();

  const {
    successBabysit,
    // setSuccessBabysit,
    // assignedPet,
    // setAssignedPet,
    user,
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
          console.log(res.data);
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

    // const current = localStorage.getItem("currentLocation");

    // if (!current.startsWith("/pets/")) {
    //   setSuccessBabysit("");
    // }

    getInfo();
  }, [location.pathname, apiUrl]);

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
        {/* <Navbar /> */}
        {successBabysit.length > 0 ? (
          <p className="successBabysit">{successBabysit}</p>
        ) : (
          ""
        )}

        <div className="petsFirstChild">
          <div id="availablePets">
            <p>Available Pets</p>
          </div>

          <select value={selectedValue} onChange={handleChange} id="petOption">
            <option value={"both"}>Both</option>
            <option value={"dog"}>Dogs</option>
            <option value={"cat"}>Cats</option>
          </select>
        </div>

        <div className="petsSecondChild">
          {loading ? (
            <p className="loading">
              <img src="/loading.gif" alt="loading" width={70} height={70} />
            </p>
          ) : (
            pets.map((p) => {
              if (
                (user && p.toBabysit !== parseInt(user.userId)) ||
                user === null
              ) {
                if (p.userId !== null) {
                  return (
                    <div key={p.id} className="foundBabysitterParent">
                      <p className="foundBabysitter">Babysitter found</p>
                      <img src={p.image} alt="pets" width={300} height={200} />

                      <div className="petsInformation" id="petsInformation">
                        <p className="petName">{p.name}</p>
                        <div className="petTypeAge">
                          <p>
                            {p.type === "cat" ? "🐱" : "🐾"}
                            {p.type.split("")[0].toUpperCase() +
                              p.type.slice(1, 3)}
                          </p>
                          <p>📅 {p.age} years old</p>
                        </div>
                        <p className="petPhone">📞 {p.phone}</p>
                        <Link className="babysitLink">
                          <button className="babysitBtn" disabled>
                            {p.type === "cat" ? "🐱" : "🐾"} View Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={p.id}>
                    <img src={p.image} alt="pets" width={300} height={200} />

                    <div className="petsInformation" id="petsInformation">
                      <p className="petName">{p.name}</p>
                      <div className="petTypeAge">
                        <p>
                          {p.type === "cat" ? "🐱" : "🐾"}{" "}
                          {p.type.split("")[0].toUpperCase() +
                            p.type.slice(1, 3)}
                        </p>
                        <p>📅 {p.age} years old</p>
                      </div>

                      <p className="petPhone">📞 {p.phone}</p>
                      <a
                        href={`/pets/${p.name}/${p.age}/${p.phone}/${p.type}`}
                        className="babysitLink"
                      >
                        <button className="babysitBtn">
                          {p.type === "cat" ? "🐱" : "🐾"} View Profile
                        </button>
                      </a>
                    </div>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
