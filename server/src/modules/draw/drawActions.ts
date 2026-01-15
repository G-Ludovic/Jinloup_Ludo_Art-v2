import type { RequestHandler } from "express";
import files from "../../utils/files";
import drawRepository from "./drawRepository";

// GET /draws
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const draws = await drawRepository.readAll();
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

    if (!name || !image) {
      // ne pas casser le front : on reste sur un 400 avec une réponse simple
      res.status(400).json({});
      return;
    }

    const insertId = await drawRepository.create({ name, image });
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

    if (!name || !image) res.status(400).json({});

    const existingDraw = await drawRepository.readById(id);
    if (!existingDraw) res.status(404).json({});

    // supprimer l’ancienne image du serveur si elle existe
    if (existingDraw.image) files.removeImageFromServer(existingDraw.image);

    const updated = await drawRepository.update(id, { name, image });
    if (!updated) res.status(404).json({});

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

    if (!draw) res.status(404).json({});

    if (draw.image) files.removeImageFromServer(draw.image);

    const deleted = await drawRepository.delete(id);
    if (!deleted) res.status(404).json({});

    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
