import type { RequestHandler } from "express";
import files from "../../utils/files";
import drawRepository from "./drawRepository";

// GET /draws
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const draws = await drawRepository.readAll();
    console.log(`API /draws: returning ${draws.length} drawings`);
    if (draws.length > 0) {
      console.log("Sample drawing:", {
        id: draws[0].id,
        name: draws[0].name,
        user_name: draws[0].user_name,
        user_id: draws[0].user_id,
      });
    }
    res.status(200).json(draws);
  } catch (err) {
    next(err);
  }
};

// GET /draws/:id
const read: RequestHandler = async (req, res, next) => {
  try {
    const draw = await drawRepository.readById(req.params.id);
    if (!draw) res.status(404).json("This draw doesn't exist");
    res.status(200).json(draw);
    return;
  } catch (err) {
    next(err);
  }
};

// POST /draws
const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, image } = req.body;
    const userId = req.user?.id;

    if (!name || !image) {
      // ne pas casser le front : on reste sur un 400 avec une réponse simple
      res.status(400).json({});
      return;
    }

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const insertId = await drawRepository.create({
      name,
      image,
      user_id: userId,
    });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// PUT /draws/:id
const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, image } = req.body;

    if (!name) {
      res.status(400).json({});
      return;
    }

    const existingDraw = await drawRepository.readById(id);
    if (!existingDraw) {
      res.status(404).json({});
      return;
    }

    const updateData: { name: string; image?: string } = { name };
    if (image) {
      // supprimer l’ancienne image du serveur si elle existe
      if (existingDraw.image) files.removeImageFromServer(existingDraw.image);
      updateData.image = image;
    }

    const updated = await drawRepository.update(id, updateData);
    if (!updated) {
      res.status(404).json({});
      return;
    }

    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

// DELETE /draws/:id
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const draw = await drawRepository.readById(id);

    if (!draw) {
      res.status(404).json({});
      return;
    }

    // Vérifier que l'utilisateur peut supprimer ce dessin
    const userRole = req.user?.role;
    const isOwner = draw.user_id === req.user?.id;
    const canDelete =
      userRole === "loup alpha" || userRole === "loup gardien" || isOwner;

    if (!canDelete) {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient rights" });
      return;
    }

    if (draw.image) files.removeImageFromServer(draw.image);

    const deleted = await drawRepository.delete(id);
    if (!deleted) res.status(404).json({});

    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
