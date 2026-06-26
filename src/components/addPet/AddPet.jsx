import { useContext, useEffect, useState } from "react";
import "./style/AddPet.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useNavigate, useLocation } from "react-router";
import Footer from "../Footer";

export default function AddPet() {
  const [petInfo, setPetInfo] = useState({
    name: "",
    age: "",
    phone: "",
    type: "Dog",
    image: null,
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { apiUrl, user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("currentPage", location.pathname);
  }, [location.pathname]);

  function handleChange(e) {
    const { value, name } = e.target;
    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    setPetInfo((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const phone =
        petInfo.phone.slice(0, 3) +
        "-" +
        petInfo.phone.slice(3, 6) +
        "-" +
        petInfo.phone.slice(6, 9);

      const formData = new FormData();

      formData.append("name", petInfo.name);
      formData.append("age", parseInt(petInfo.age));
      formData.append("phone", phone);
      formData.append("type", petInfo.type.toLowerCase());

      if (petInfo.image) {
        formData.append("image", petInfo.image);
      }

      const res = await axios.post(`${apiUrl}/pets/add`, formData, {
        withCredentials: true,
      });

      if (res.data) {
        navigate("/pets");
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="addPetParent">
        <div className="addPetChild">
          {error && (
            <div className="errorExists">
              Pet with that information already exists.
            </div>
          )}
          <form className="petFormInfo" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={petInfo.name}
              onChange={handleChange}
              required
              placeholder="Enter pets name"
            />
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={petInfo.age}
              onChange={handleChange}
              required
              placeholder="Enter pets age"
            />
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={petInfo.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
            <label>Type</label>
            <select
              className="selectPet"
              name="type"
              value={petInfo.type}
              onChange={handleChange}
              required
            >
              <option value={"dog"}>Dog</option>
              <option value={"cat"}>Cat</option>
            </select>
            <label>Image</label>
            <input
              type="file"
              name="image"
              className="petFileImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {loading ? (
              <button className="petFormSubmit pfsDisabled" disabled>
                Loading...
              </button>
            ) : (
              <button type="submit" className="petFormSubmit">
                Submit
              </button>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
