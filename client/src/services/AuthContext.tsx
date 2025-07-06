import { createContext, useContext, useEffect, useState } from "react";
import type { Auth, Children } from "../types/auth";

const AuthContext = createContext<null | Auth>(null);

export const AuthProvider = ({ children }: Children) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:3310/api/refresh", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLogged(true);
        setUser(data);
      });
  }, []);

  return (
    <AuthContext value={{ isLogged, setIsLogged }}>{children}</AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("A context must be provided");
  }

  return context;
};
