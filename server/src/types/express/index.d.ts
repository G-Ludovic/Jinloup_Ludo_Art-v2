// pour faire du fichier un module et éviter l'erreur TypeScript
export type {};

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Ajoutez vos propriétés personnalisées ici, par exemple :
      //
      // user?: { ... }
      /* ************************************************************************* */
      user?: JwtPayload & {
        id: number;
        email: string;
        role: string;
      };
      cookies: Record<string, string>;
    }
  }
}
