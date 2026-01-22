// Centralisation des appels API, typés et sécurisés, fetchAuth inclus
import { API_URL } from "./config";
import { ENDPOINTS } from "./endpoints";
import type {
  Category,
  Draw,
  Message,
  OnlineStats,
  Subject,
} from "./types/auth";

async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Erreur fetch ${endpoint}:`, error);
    return null;
  }
}

export async function fetchAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Erreur fetchAuth ${endpoint}:`, error);
    return null;
  }
}

// ------------------- Fonctions spécifiques -------------------

export async function loadSubjects() {
  return fetchAPI<Subject[]>(ENDPOINTS.subjects);
}
export async function loadMessages() {
  return fetchAPI<Message[]>(ENDPOINTS.messages);
}
export async function loadCategories() {
  return fetchAPI<Category[]>(ENDPOINTS.categories);
}
export async function loadDraws() {
  return fetchAPI<Draw[]>(ENDPOINTS.draws);
}
export async function loadOnlineStats() {
  return fetchAPI<OnlineStats>(ENDPOINTS.onlineStats);
}
