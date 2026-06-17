import { useState } from "react";
import { authContext } from "./authContext";

function AuthContextProvider({ children }) {
  const [userTkn, setUserTkn] = useState(localStorage.getItem("userTkn"));

  const isUserLoggedIn = !!userTkn;

  const saveUserTkn = (tkn) => {
    setUserTkn(tkn);
  };

  const clearUserTkn = () => {
    setUserTkn(null);
  };

  return (
    <authContext.Provider
      value={{ userTkn, saveUserTkn, isUserLoggedIn, clearUserTkn }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
