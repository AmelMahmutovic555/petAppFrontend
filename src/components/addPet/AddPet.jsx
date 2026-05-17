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
    image: "",
  });

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

    console.log(typeof value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const petInfoObj = {
        name: petInfo.name,
        age: parseInt(petInfo.age),
        phone: petInfo.phone,
        type: petInfo.type,
        image: petInfo.image,
      };

      const res = await axios.post(`${apiUrl}/pets/add`, petInfoObj, {
        withCredentials: true,
      });

      if (res.data) {
        navigate("/pets");
      }
    } catch (error) {}
  }

  return (
    <>
      <section className="addPetParent">
        <div className="addPetChild">
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
              <option>Dog</option>
              <option>Cat</option>
            </select>
            <label>Image</label>
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
      </section>

      <Footer />
    </>
  );
}
