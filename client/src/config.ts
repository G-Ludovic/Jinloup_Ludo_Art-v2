// Centralisation de API_URL
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

if (!API_URL) {
  console.error("⚠️ VITE_API_URL n'est pas définie !");
}
