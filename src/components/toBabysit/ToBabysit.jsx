import { useLocation } from "react-router";
import "./style/ToBabysit.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import Footer from "../Footer";

export default function ToBabysit() {
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
          `${apiUrl}/pets/findByToBabysitUser/${user && parseInt(user.userId)}`,
        );

        setPets(res.data);
        // }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getInfo();
  }, [location.pathname, user]);
  return (
    <>
      <section className="toBabysitParent">
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
