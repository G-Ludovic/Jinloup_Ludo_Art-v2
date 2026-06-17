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

// Mapping des sujets pour un affichage lisible
const SUBJECT_LABELS: Record<string, string> = {
  general: "Question générale sur le site",
  technical: "Problème technique / bug",
  registration: "Inscription / connexion",
  forum: "Questions sur le forum",
  gallery: "Galerie de dessins",
  suggestion: "Suggestion d'amélioration",
  report: "Signaler un contenu / abus",
  partnership: "Partenariat / collaboration",
  other: "Autre",
};

const send: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation côté serveur
    const errors: string[] = [];
    if (!name || !name.trim() || name.trim().length < 2) {
      errors.push("Le pseudo est requis (min. 2 caractères).");
    }
    if (!email || !email.trim()) {
      errors.push("L'email est requis.");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push("Format d'email invalide.");
      }
    }
    if (!subject) {
      errors.push("Le sujet est requis.");
    } else if (!SUBJECT_LABELS[subject]) {
      errors.push("Sujet invalide.");
    }
    if (!message || !message.trim() || message.trim().length < 10) {
      errors.push("Le message est requis (min. 10 caractères).");
    }

    if (errors.length > 0) {
      res.status(400).json({ message: errors.join(" ") });
      return;
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject;

    // Email pour le propriétaire du site
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact Jinloup Ludo Art] ${subjectLabel} - ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Pseudo</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Téléphone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone || "Non renseigné"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Sujet</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subjectLabel}</td>
          </tr>
        </table>
        <hr style="margin: 16px 0;"/>
        <h3>Message :</h3>
        <p style="white-space: pre-wrap;">${message}</p>
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
