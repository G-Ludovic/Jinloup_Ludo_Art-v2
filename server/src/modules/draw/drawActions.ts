import type { RequestHandler } from "express";
import drawRepository from "./drawRepository";

const browse: RequestHandler = async (req, res) => {
  const result = await drawRepository.readAll();

  res.json(result);
};

const read: RequestHandler = async (req, res) => {
  const result = await drawRepository.readById(req.params.id);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json("This draw doesn't exist");
  }
};

const edit: RequestHandler = async (req, res) => {
  try {
    const result = await drawRepository.update(req.body, req.params.id);

    if (result) {
      res.status(201).json(`${req.body.name} has been updated successfully`);
    } else {
      res.status(404).json("This draw doesn't exist");
    }
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

const add: RequestHandler = async (req, res) => {
  try {
    const result = await drawRepository.create(req.body);

    if (result) {
      res.status(201).json("A new draw has been created successfully");
    } else {
      res.status(404).json("This draw doesn't exist");
    }
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

const destroy: RequestHandler = async (req, res) => {
  const deleteVideoGame = await drawRepository.delete(req.params.id);

  if (deleteVideoGame) {
    res.status(200).json("A draw has been successfully deleted !");
  } else {
    res.status(404).json("Impossible to delete a draw");
  }
};

export default { browse, read, edit, add, destroy };
