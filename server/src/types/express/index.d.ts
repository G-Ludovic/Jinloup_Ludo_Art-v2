// pour faire du fichier un module et éviter l'erreur TypeScript
export type {};

declare global {
  namespace Express {
    export interface Request {
<<<<<<< HEAD
=======
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
>>>>>>> 3b2bebdc6d10183b410759dbf0a341809e675e6d
      user?: JwtPayload & {
        id: number;
        email: string;
        role: string;
      };
      cookies: Record<string, string>;
    }
  }
}
