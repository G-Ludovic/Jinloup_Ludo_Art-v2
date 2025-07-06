import type { ReactNode } from "react";

export interface Children {
  children: ReactNode;
}

export interface Auth {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}
