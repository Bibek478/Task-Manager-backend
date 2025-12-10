import React, { createContext, useContext, useState, useEffect } from "react";
import { parseJwt, setTokenLocal, getTokenLocal, clearTokenLocal } from "@/lib/token";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getTokenLocal());
  const [user, setUser] = useState(() => (token ? parseJwt(token) : null));

  useEffect(() => {
    const storedToken = getTokenLocal();
    if (storedToken) {
      api.setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setTokenLocal(token);
      api.setToken(token);
      setUser(parseJwt(token));
    } else {
      clearTokenLocal();
      api.setToken(null);
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    api.setToken(newToken);
    setToken(newToken);
  };
  
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
