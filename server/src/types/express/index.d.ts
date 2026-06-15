// pour faire du fichier un module et éviter l'erreur TypeScript
export type {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}
