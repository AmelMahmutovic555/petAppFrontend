import { useContext, useState } from "react";
import "./style/AddPet.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useNavigate } from "react-router";
import Footer from "../Footer";

export default function AddPet() {
  const [petInfo, setPetInfo] = useState({
    name: "",
    age: 0,
    phone: "",
    type: "Dog",
    image: "",
  });

  const navigate = useNavigate();
  const { apiUrl } = useContext(AuthContext);
  function handleChange(e) {
    const { value, name } = e.target;
    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const petInfoObj = {
        name: petInfo.name,
        age: petInfo.age,
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
            />
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={petInfo.age}
              onChange={handleChange}
              required
            />
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={petInfo.phone}
              onChange={handleChange}
              required
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
