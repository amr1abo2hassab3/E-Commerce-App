import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState("");
  const [email, setEmail] = useState("");

  const decryptUserToken = () => {
    const userData = jwtDecode(userToken);
    setUserData(userData);
  };

  useEffect(() => {
    if (userToken) decryptUserToken();
  }, [userToken]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUserToken(localStorage.getItem("token"));
      setEmail(localStorage.getItem("userEmail"));
    }
  }, []);

  return (
    <authContext.Provider
      value={{ userToken, setUserToken, userData, email, setEmail }}
    >
      {children}
    </authContext.Provider>
  );
};
