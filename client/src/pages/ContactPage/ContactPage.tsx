import { useState } from "react";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
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
              <label>
                <p>Nom</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Nanouk"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="loup@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <p>Message</p>
                <textarea
                  name="message"
                  placeholder="Votre message ici..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Envoyer</button>
              </label>
            </form>
          )}
        </div>
        <div className="illustration-contact">
          <img
            src="\images\wolf_contactpage.png"
            alt="illustration du héros du site pour la prise de contact"
          />
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
