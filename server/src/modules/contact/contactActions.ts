import { setDefaultResultOrder } from "node:dns";
import { Client } from "@sendgrid/client";
import sgMail from "@sendgrid/mail";
import type { RequestHandler } from "express";

// Forcer la résolution DNS en IPv4
setDefaultResultOrder("ipv4first");

// Configuration SendGrid (API Email) avec résidence des données dans l'UE
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.warn(
    "⚠️  SENDGRID_API_KEY non définie. Les emails de contact ne pourront pas être envoyés.",
  );
}
const client = new Client();
client.setApiKey(SENDGRID_API_KEY || "");
client.setDataResidency("eu");
sgMail.setClient(client);

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
    } else if (message.trim().length > 500) {
      errors.push("Le message ne peut pas dépasser 500 caractères.");
    }

    if (errors.length > 0) {
      res.status(400).json({ message: errors.join(" ") });
      return;
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject;

    // Email pour le propriétaire du site via SendGrid API
    const msg = {
      to: process.env.CONTACT_EMAIL || "jinshi.wolf@gmail.com",
      from: {
        email:
          process.env.FROM_EMAIL ||
          process.env.SMTP_USER ||
          "jinshi.wolf@gmail.com",
        name: "Jinloup Ludo Art - Contact",
      },
      replyTo: { email, name },
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

    await sgMail.send(msg);

    res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur lors de l'envoi du mail :", errorMessage);

    // Afficher le détail de l'erreur SendGrid si disponible
    if (error instanceof Error && "response" in error) {
      const sgError = error as {
        response?: { body?: { errors?: Array<{ message: string }> } };
      };
      console.error(
        "Détail SendGrid :",
        JSON.stringify(sgError.response?.body?.errors, null, 2),
      );
    }

    // Détecter les erreurs d'authentification SendGrid
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: number }).code === 401
    ) {
      res.status(500).json({
        message:
          "Erreur de configuration de l'envoi d'email. Veuillez contacter l'administrateur du site.",
      });
    } else {
      res.status(500).json({ message: "Erreur lors de l'envoi du message." });
    }
  }
};

export default { send };
