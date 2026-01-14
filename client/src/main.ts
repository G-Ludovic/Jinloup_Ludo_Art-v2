import { loadCategories, loadDraws, loadMessages, loadSubjects } from "./api";

async function main() {
  console.log(
    "Application front démarrée avec API_URL =",
    import.meta.env.VITE_API_URL,
  );
  await Promise.all([
    loadSubjects(),
    loadMessages(),
    loadCategories(),
    loadDraws(),
  ]);
}

main();
