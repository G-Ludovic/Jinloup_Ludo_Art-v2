/// <reference types="vite/client" />
// Cela fournit les types pour les variables d'environnement injectées par Vite sur import.meta.env
// Voir https://vite.dev/guide/features.html#client-types

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
