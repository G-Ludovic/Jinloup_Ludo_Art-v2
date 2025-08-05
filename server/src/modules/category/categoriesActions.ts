import type { RequestHandler } from "express";
import categoriesRepository from "./categoriesRepository";

const browse: RequestHandler = async (req, res) => {
  const result = await categoriesRepository.readAll();
  res.json(result);
};

const read: RequestHandler = async (req, res) => {
  try {
    const category = await categoriesRepository.readById(req.params.id);

    if (category) {
      res.json(category);
    } else {
      res.status(404).json("Catégorie non trouvée");
    }
  } catch (error) {
    res.status(500).json("Erreur serveur");
  }
};

export default { browse, read };
