export interface User {
  id: number;
  email: string;
  role: "loup alpha" | "loup gardien" | "jeune loup";
}

export interface Auth {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface Children {
  children: React.ReactNode;
}
