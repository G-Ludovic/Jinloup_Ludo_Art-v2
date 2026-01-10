// pour faire du fichier un module et éviter l'erreur TypeScript
export type {};

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload & {
        id: number;
        email: string;
        role: string;
      };
      cookies: Record<string, string>;
    }
  }
}
