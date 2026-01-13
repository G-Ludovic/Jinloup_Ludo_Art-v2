const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("⚠️ La variable VITE_API_URL n'est pas définie !");
}

export async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur fetch ${endpoint}:`, error);
    return null;
  }
}

export async function loadSubjects() {
  const subjects = await fetchAPI("/api/subject");
  if (subjects) console.log("Sujets récupérés :", subjects);
}

export async function loadMessages() {
  const messages = await fetchAPI("/api/message");
  if (messages) console.log("Messages récupérés :", messages);
}

export async function loadCategories() {
  const categories = await fetchAPI("/api/categories");
  if (categories) console.log("Catégories récupérées :", categories);
}

export async function loadDraws() {
  const draws = await fetchAPI("/api/draws");
  if (draws) console.log("Dessins récupérés :", draws);
}
