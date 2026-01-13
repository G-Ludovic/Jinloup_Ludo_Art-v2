import "dotenv/config";
import "../database/checkConnection";
import app from "./app";

// Définir le port à utiliser
const port = process.env.PORT || process.env.APP_PORT || 3310;

app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });

// Ici on ne touche pas à import.meta.env !
console.log("Backend Node démarré sur le port", port);
