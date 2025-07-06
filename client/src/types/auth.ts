import type { ReactNode } from "react";

export interface Children {
  children: ReactNode;
}

export interface Auth {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
