import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [apiUrl] = useState(process.env.REACT_APP_API_URL);

  const [user, setUser] = useState(null);
  // const [existingUser, setExistingUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [successBabysit, setSuccessBabysit] = useState("");
  const [assignedPet, setAssignedPet] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const getInfo = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      // setLoading(false);
    }
  }, [apiUrl, location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      getInfo();
    }
  }, [getInfo]);

  async function handleLogout() {
    try {
      // setLoading(true);
      await axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      navigate("/");
      // setLoading(false);
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
