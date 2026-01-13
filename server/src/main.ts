// Charger les variables d'environnement à partir du fichier .env
import "dotenv/config";

// Vérifier la connexion à la base de données

/* Remarque : Cette étape est facultative et peut être supprimée si la connexion à la base de données n'est pas requise au démarrage de l'application */
import "../database/checkConnection";

// Importer l'application Express depuis ./app
import app from "./app";

// Récupérer le port à partir des variables d'environnement
const port = process.env.PORT || 3310;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Démarrer le serveur et écouter sur le port spécifié
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
