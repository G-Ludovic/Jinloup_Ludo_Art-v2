import type { RequestHandler } from "express";
import nodemailer from "nodemailer";

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const send: RequestHandler = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation simple côté serveur
    if (!name || !email || !message) {
      res.status(400).json({ message: "Tous les champs sont requis." });
      return;
    }

    // Email pour le propriétaire du site (toi)
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL, // L'adresse qui reçoit les messages
      replyTo: email,
      subject: `[Contact Jinloup Ludo Art] Message de ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Pseudo :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr/>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
};

export default { send };
