import type { RequestHandler } from "express";
import files from "../../utils/files";
import messageRepository from "./messageRepository";

const add: RequestHandler = async (req, res) => {
  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const { content, user_id, subject_id } = req.body;
    console.log("🧾 Nouveau message reçu :", req.body);

    if (!content?.trim()) {
      res.status(400).json("Content is required");
      return;
    }

    if (!user_id || !subject_id) {
      res.status(400).json("User ID and Subject ID are required");
      return;
    }

    const newId = await messageRepository.create({
      content,
      file: filePath,
      user_id: Number(user_id),
      subject_id: Number(subject_id),
    });

    const createdMessage = await messageRepository.readById(String(newId));

    res.status(201).json({
      id: newId,
      content,
      file: filePath,
      sending_date: new Date().toISOString(),
      validated: false,
      user_id: 1, // ou l'user actuel
      subject_id: 1, // par défaut
    });
  } catch (err) {
    console.error("❌ Error creating message:", err);
    if (!res.headersSent) res.status(500).json("Internal server error");
  }
};

const browse: RequestHandler = async (_req, res) => {
  try {
    const messages = await messageRepository.readAll();
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json("Internal server error");
  }
};

const read: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageRepository.readById(id);
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json("Message not found");
    }
  } catch (err) {
    console.error("❌ Error fetching message:", err);
    if (!res.headersSent) res.status(500).json("Internal server error");
  }
};

const edit: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const { content } = req.body;

    if (!content?.trim()) {
      res.status(400).json("Content is required");
      return;
    }

    const existing = await messageRepository.readById(id);
    if (!existing) {
      res.status(404).json("Message not found");
      return;
    }

    if (filePath && existing.file) {
      files.removeImageFromServer(existing.file);
    }

    await messageRepository.update(id, {
      content,
      file: filePath || existing.file,
    });

    const updated = await messageRepository.readById(id);
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Error updating message:", err);
    if (!res.headersSent) res.status(500).json("Internal server error");
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageRepository.readById(id);
    if (!message) {
      res.status(404).json("Message not found");
      return;
    }

    if (message.file) files.removeImageFromServer(message.file);
    await messageRepository.delete(id);

    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Error deleting message:", err);
    if (!res.headersSent) res.status(500).json("Internal server error");
  }
};

export default { add, browse, read, edit, destroy };
