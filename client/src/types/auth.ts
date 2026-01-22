export interface User {
  id: number;
  email: string;
  pseudo?: string;
  role: "loup alpha" | "loup gardien" | "jeune loup";
  avatar?: string;
  bio?: string;
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

export interface Subject {
  id: number;
  name: string;
}
export interface Message {
  id: number;
  content: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Draw {
  id: number;
  title: string;
  url: string;
}
export interface OnlineStats {
  stats: Array<{
    role: string;
    total: number;
    online: number;
  }>;
}
