import { createContext, useContext, useEffect, useState } from "react";
import type { Auth, Children, User } from "../types/auth";

const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: Children) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Refresh token au chargement de l'app
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/refresh", {
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await res.json();
        setIsLogged(true);
        setUser(data); // data contient id, email et role
      } catch (err) {
        console.error("Failed to refresh user", err);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <- c’est safe ici, on veut que ça ne s’exécute qu’une seule fois

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      // Après login, on refresh pour récupérer l'utilisateur complet avec son role
      const refreshRes = await fetch("/api/refresh", {
        credentials: "include",
      });

      if (!refreshRes.ok) throw new Error("Failed to fetch user");

      const data = await refreshRes.json();
      setIsLogged(true);
      setUser(data);
    } catch (err) {
      console.error(err);
      throw err; // on peux aussi gérer une popup erreur côté UI (à voir plus tard)
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsLogged(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  return context;
};
