import type { RequestHandler } from "express";
import itemRepository from "./itemRepository";

// GET /items - Browse
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const items = await itemRepository.readAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// GET /items/:id - Read
const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
<<<<<<< HEAD
    if (Number.isNaN(id) || id <= 0) return res.status(404).json({});

    const item = await itemRepository.read(id);
    if (!item) return res.status(404).json({});
=======
    if (Number.isNaN(id) || id <= 0) {
      res.status(404).json({});
      return;
    }

    const item = await itemRepository.read(id);
    if (!item) {
      res.status(404).json({});
      return;
    }
>>>>>>> 3b2bebdc6d10183b410759dbf0a341809e675e6d

    res.json(item);
  } catch (err) {
    next(err);
  }
};

// POST /items - Add
const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, user_id } = req.body;

    // Validation stricte
    if (
      !req.body ||
      Object.keys(req.body).length === 0 ||
      !title ||
      user_id === undefined
    ) {
<<<<<<< HEAD
      return res.status(400).json({});
=======
      res.status(400).json({});
      return;
>>>>>>> 3b2bebdc6d10183b410759dbf0a341809e675e6d
    }

    const insertId = await itemRepository.create({ title, user_id });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// PUT /items/:id - Edit
const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, user_id } = req.body;

    // Validation ID et corps
<<<<<<< HEAD
    if (Number.isNaN(id) || id <= 0) return res.status(404).json({});
=======
    if (Number.isNaN(id) || id <= 0) {
      res.status(404).json({});
      return;
    }
>>>>>>> 3b2bebdc6d10183b410759dbf0a341809e675e6d
    if (
      !req.body ||
      Object.keys(req.body).length === 0 ||
      !title ||
      user_id === undefined
    ) {
<<<<<<< HEAD
      return res.status(400).json({});
    }

    const affectedRows = await itemRepository.update(id, { title, user_id });
    if (affectedRows === 0) return res.status(404).json({});
=======
      res.status(400).json({});
      return;
    }

    const affectedRows = await itemRepository.update(id, { title, user_id });
    if (affectedRows === 0) {
      res.status(404).json({});
      return;
    }
>>>>>>> 3b2bebdc6d10183b410759dbf0a341809e675e6d

    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:id - Destroy
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
<<<<<<< HEAD
    if (Number.isNaN(id) || id <= 0) return res.status(404).json({});

    const deleted = await itemRepository.delete(id);
    if (deleted === 0) return res.status(404).json({});
=======
    if (Number.isNaN(id) || id <= 0) {
      res.status(404).json({});
      return;
    }

    const deleted = await itemRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({});
      return;
    }
>>>>>>> 3b2bebdc6d10183b410759dbf0a341809e675e6d

    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
