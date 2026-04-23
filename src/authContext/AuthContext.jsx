import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [apiUrl] = useState(process.env.REACT_APP_API_URL);

  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [successBabysit, setSuccessBabysit] = useState("");
  const [assignedPet, setAssignedPet] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get(`${apiUrl}/user/me`, {
          withCredentials: true,
        });

        console.log(res.data);

        // if (res.data) {
        setUser(res.data);
        // } else {
        // setUser(null);
        // }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        // setLoading(false);
      }
    }

    getInfo();
  }, []);

  async function handleLogout() {
    try {
      const res = await axios.post(
        `${apiUrl}/user/logout`,
        {},
        { withCredentials: true },
      );

      // console.log(res.data);

      if (res.data) {
        console.log(res.data);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        successBabysit,
        setSuccessBabysit,
        assignedPet,
        setAssignedPet,
        apiUrl,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
