import type { RequestHandler } from "express";
import files from "../../utils/files";
import messageRepository from "./messageRepository";

const add: RequestHandler = async (req, res) => {
  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const { content, user_id, subject_id } = req.body;

    if (!content?.trim()) {
      res.status(400).json({ error: "Content is required" });
      return;
    }

    if (!user_id || !subject_id) {
      res.status(400).json({ error: "User ID and Subject ID are required" });
      return;
    }

    const newId = await messageRepository.create({
      content,
      file: filePath,
      user_id: Number(user_id),
      subject_id: Number(subject_id),
    });

    const createdMessage = await messageRepository.readById(newId); // Pas de String()

    res.status(201).json({
      id: newId,
      content,
      file: filePath,
      sending_date: new Date().toISOString(),
      validated: false,
      user_id: Number(user_id), // Utilise la vraie valeur
      subject_id: Number(subject_id), // Utilise la vraie valeur
    });
  } catch (err) {
    console.error("❌ Error creating message:", err);
    if (!res.headersSent)
      res.status(500).json({ error: "Internal server error" });
  }
};

const browse: RequestHandler = async (req, res) => {
  try {
    const { subject_id } = req.query;

    if (subject_id) {
      const messages = await messageRepository.readBySubjectId(
        Number(subject_id),
      );
      res.status(200).json(messages);
    } else {
      const messages = await messageRepository.readAll();
      res.status(200).json(messages);
    }
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json("Internal server error");
  }
};

const read: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageRepository.readById(Number(id));
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

    const existing = await messageRepository.readById(Number(id));
    if (!existing) {
      res.status(404).json("Message not found");
      return;
    }

    if (filePath && existing.file) {
      files.removeImageFromServer(existing.file);
    }

    await messageRepository.update(String(id), {
      content,
      file: filePath || existing.file,
    });

    const updated = await messageRepository.readById(Number(id));
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Error updating message:", err);
    if (!res.headersSent) res.status(500).json("Internal server error");
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageRepository.readById(Number(id));
    if (!message) {
      res.status(404).json("Message not found");
      return;
    }

    if (message.file) files.removeImageFromServer(message.file);
    await messageRepository.delete(String(id));

    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Error deleting message:", err);
    if (!res.headersSent) res.status(500).json("Internal server error");
  }
};

export default { add, browse, read, edit, destroy };
