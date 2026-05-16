import { useContext, useEffect, useState } from "react";
import "./style/YourPets.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { Link, useLocation } from "react-router";
import Footer from "../Footer";

export default function YourPets() {
  const { user, apiUrl } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    async function getInfo() {
      try {
        // if (user) {
        const res = await axios.get(
          `${apiUrl}/pets/findByUser/${user && parseInt(user.userId)}`,
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
  }, [location.pathname, user]);
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

                <div className="petsInformation">
                  <p className="petName">{p.name}</p>
                  <p>📅 Age: {p.age}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
