import { useState } from "react";
import { API_URL } from "../../config";
import { ENDPOINTS } from "../../endpoints";
import "./ContactPage.css";

// Liste des sujets prédéfinis pour aider les nouveaux visiteurs
const SUBJECT_OPTIONS = [
  { value: "", label: "-- Choisissez un sujet --" },
  { value: "general", label: "Question générale sur le site" },
  { value: "technical", label: "Problème technique / bug" },
  { value: "registration", label: "Inscription / connexion" },
  { value: "forum", label: "Questions sur le forum" },
  { value: "gallery", label: "Galerie de dessins" },
  { value: "suggestion", label: "Suggestion d'amélioration" },
  { value: "report", label: "Signaler un contenu / abus" },
  { value: "partnership", label: "Partenariat / collaboration" },
  { value: "other", label: "Autre" },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation du pseudo
    if (!formData.name.trim()) {
      newErrors.name = "Le pseudo est requis.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le pseudo doit contenir au moins 2 caractères.";
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Veuillez entrer une adresse email valide.";
    }

    // Validation du sujet
    if (!formData.subject) {
      newErrors.subject = "Veuillez sélectionner un sujet.";
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères.";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Le message ne peut pas dépasser 500 caractères.";
    }

    // Validation du consentement RGPD
    if (!formData.consent) {
      newErrors.consent =
        "Vous devez accepter la politique de confidentialité.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Effacer l'erreur du champ en cours d'édition
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${ENDPOINTS.contact}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
        }),
      });

      // Vérifier le type de contenu avant de parser le JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Réponse non-JSON reçue:", text);
        throw new Error(
          "Le serveur a répondu avec une page HTML au lieu de JSON. Vérifiez que l'URL de l'API est correcte en production.",
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi du message.");
      }

      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'envoi.";
      setError(message);
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour obtenir le libellé du sujet sélectionné
  const getSubjectLabel = (value: string): string => {
    const option = SUBJECT_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <main className="contact-page-main">
      <h1>Contact</h1>

      {/* Section d'introduction pour les nouveaux visiteurs */}
      <section className="contact-intro">
        <p>
          Bienvenue sur Jinloup Ludo Art ! Vous avez une question, un problème
          technique, ou simplement envie de nous dire bonjour ? Remplissez le
          formulaire ci-dessous et nous vous répondrons dans les plus brefs
          délais.
        </p>
        <p className="contact-intro-response-time">
          ⏱️ Délai de réponse moyen : <strong>24 à 48 heures</strong>
        </p>
      </section>

      <section className="form-grid">
        <div className="contact-container">
          {submitted ? (
            <div className="success-container">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Message envoyé avec succès !</h2>
              <p className="success-message">
                Merci <strong>{formData.name}</strong> pour votre message
                concernant « {getSubjectLabel(formData.subject)} ».
              </p>
              <p className="success-details">
                Un email de confirmation a été envoyé à{" "}
                <strong>{formData.email}</strong>. Notre équipe vous répondra
                dans les plus brefs délais (généralement sous 24 à 48 heures).
              </p>
              <button
                type="button"
                className="success-reset-button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    consent: false,
                  });
                }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {error && <p className="error-message">{error}</p>}

              {/* Pseudo */}
              <label htmlFor="name">
                <p>
                  Pseudo <span className="required">*</span>
                </p>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nanouk"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={errors.name ? "input-error" : ""}
                />
                <span className="field-help">
                  Votre pseudo ou surnom (tel qu'affiché sur le forum)
                </span>
                {errors.name && (
                  <span className="field-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </label>

              {/* Email */}
              <label htmlFor="email">
                <p>
                  Email <span className="required">*</span>
                </p>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="loup@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={errors.email ? "input-error" : ""}
                />
                <span className="field-help">
                  Nous ne partagerons jamais votre email
                </span>
                {errors.email && (
                  <span className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </label>

              {/* Téléphone (optionnel) */}
              <label htmlFor="phone">
                <p>Téléphone</p>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <span className="field-help">
                  Optionnel - Utile si vous préférez être contacté par téléphone
                </span>
              </label>

              {/* Sujet */}
              <label htmlFor="subject">
                <p>
                  Sujet <span className="required">*</span>
                </p>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={errors.subject ? "input-error" : ""}
                >
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="field-help">
                  Choisissez le sujet qui correspond le mieux à votre demande
                </span>
                {errors.subject && (
                  <span className="field-error" role="alert">
                    {errors.subject}
                  </span>
                )}
              </label>

              {/* Message */}
              <label htmlFor="message">
                <p>
                  Message <span className="required">*</span>
                </p>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez votre demande en quelques lignes..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  rows={6}
                  maxLength={500}
                  className={errors.message ? "input-error" : ""}
                />
                <span className="field-help">
                  Minimum 10 caractères, maximum 500 caractères. Soyez le plus
                  précis possible.
                </span>
                <span
                  className={`char-counter ${formData.message.length > 500 ? "char-counter-over" : ""}`}
                >
                  {formData.message.length}/500
                </span>
                {errors.message && (
                  <span className="field-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </label>

              {/* Consentement RGPD */}
              <label htmlFor="consent" className="consent-label">
                <input
                  id="consent"
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={errors.consent ? "input-error" : ""}
                />
                <span>
                  J'accepte la{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    politique de confidentialité
                  </a>{" "}
                  et j'autorise Jinloup Ludo Art à traiter mes données
                  personnelles pour répondre à ma demande.{" "}
                  <span className="required">*</span>
                </span>
                {errors.consent && (
                  <span className="field-error" role="alert">
                    {errors.consent}
                  </span>
                )}
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
        <div className="illustration-contact">
          <img
            src="\images\loup_contact.webp"
            alt="illustration du héros du site pour la prise de contact"
          />
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
