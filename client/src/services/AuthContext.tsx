import { createContext, useContext, useEffect, useState } from "react";
import type { Auth, Children, User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: Children) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Refresh token au chargement de l'app
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/api/refresh`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;

        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setIsLogged(true);
        console.log("Setting user in refresh:", {
          id: data.id,
          email: data.email,
          pseudo: data.pseudo,
          avatar: data.avatar,
          bio: data.bio,
          role: data.role,
        });
        setUser({
          id: data.id,
          email: data.email,
          pseudo: data.pseudo,
          avatar: data.avatar,
          bio: data.bio,
          role: data.role,
        });
      } catch (err) {
        console.error("Failed to refresh user", err);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <- c’est safe ici, on veut que ça ne s’exécute qu’une seule fois

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      const token = data.token;
      localStorage.setItem("token", token);

      // Après login, on refresh pour récupérer l'utilisateur complet avec son role
      const refreshRes = await fetch(`${API_URL}/api/refresh`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!refreshRes.ok) throw new Error("Failed to fetch user");

      const userData = await refreshRes.json();
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }
      setIsLogged(true);
      console.log("Setting user in login:", {
        id: userData.id,
        email: userData.email,
        pseudo: userData.pseudo,
        avatar: userData.avatar,
        bio: userData.bio,
        role: userData.role,
      });
      setUser({
        id: userData.id,
        email: userData.email,
        pseudo: userData.pseudo,
        avatar: userData.avatar,
        bio: userData.bio,
        role: userData.role,
      });
    } catch (err) {
      console.error(err);
      throw err; // on peux aussi gérer une popup erreur côté UI (à voir plus tard)
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        localStorage.removeItem("token");
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
