import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [apiUrl] = useState(process.env.REACT_APP_API_URL);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successBabysit, setSuccessBabysit] = useState("");
  const [assignedPet, setAssignedPet] = useState({});
  const location = useLocation();

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get(`${apiUrl}/user/me`, {
          withCredentials: true,
        });

        // console.log(res.data);

        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    getInfo();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        successBabysit,
        setSuccessBabysit,
        assignedPet,
        setAssignedPet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
