import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userInfo = localStorage.getItem("ZorvynFinanceUserInfo");
  const [user, setUser] = useState(userInfo ? JSON.parse(userInfo) : null);

  const login = (user) => {
    localStorage.setItem("ZorvynFinanceUserInfo", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("ZorvynFinanceUserInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
