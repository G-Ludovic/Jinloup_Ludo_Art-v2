import { createContext, useState } from "react";
import type { Auth, Children } from "../types/auth";

const AuthContext = createContext<null | Auth>(null);

export const AuthProvider = ({ children }: Children) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext value={{ isLogged, setIsLogged }}>{children}</AuthContext>
  );
};
