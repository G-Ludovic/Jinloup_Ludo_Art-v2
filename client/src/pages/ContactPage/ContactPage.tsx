import { useState } from "react";
import { API_URL } from "../../config";
import { ENDPOINTS } from "../../endpoints";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${ENDPOINTS.contact}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  return (
    <main className="contact-page-main">
      <h1>Contact</h1>
      <section className="form-grid">
        <div className="contact-container">
          {submitted ? (
            <p className="success-message">Merci pour votre message !</p>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {error && <p className="error-message">{error}</p>}

              <label htmlFor="name">
                <p>Pseudo</p>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nanouk"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="email">
                <p>Email</p>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="loup@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="message">
                <p>Message</p>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Votre message ici..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer"}
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
