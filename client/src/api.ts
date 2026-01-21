const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

if (!API_URL) {
  console.error("⚠️ VITE_API_URL n'est pas définie !");
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
  await fetchAPI("/api/subject");
}

export async function loadMessages() {
  await fetchAPI("/api/message");
}

export async function loadCategories() {
  await fetchAPI("/api/categories");
}

export async function loadDraws() {
  await fetchAPI("/api/draws");
}

export async function loadOnlineStats() {
  return await fetchAPI("/api/online-stats");
}

export async function fetchAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return await fetch(`${API_URL}${endpoint}`, { ...options, headers });
}
