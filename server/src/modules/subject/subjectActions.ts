import type { RequestHandler } from "express";
import subjectRepository from "./subjectRepository";

// Récupérer tous les sujets
const browse: RequestHandler = async (req, res, next) => {
  try {
    const subjects = await subjectRepository.readAll();
    res.json(subjects);
  } catch (err) {
    next(err);
  }
};

// Récupérer un seul sujet par ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const subject = await subjectRepository.read(id);

    if (!subject) {
      res.status(404).json({});
      return;
    }
    res.json(subject);
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
