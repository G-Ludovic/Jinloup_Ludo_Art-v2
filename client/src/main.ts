// bootstrap simple avec vérification API_URL
import { API_URL } from "./config";

function main() {
  console.log("🚀 Application front démarrée avec API_URL =", API_URL);

  if (!API_URL) {
    console.error("❌ API_URL non définie, vérifiez .env");
  } else {
    console.log("✅ Configuration API OK");
  }
}

main();
