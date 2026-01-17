import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="banner-footer">
      <div className="footer-logo">
        <img
          src="/images/logo-ongl.webp"
          alt="logo du site Jinloup Ludo Art"
          className="logo-wolf"
        />
      </div>

      <nav className="footer-links" aria-label="Liens du footer">
        <div className="footer-column">
          <Link to="/privacy-policy">Politique de confidentialité</Link>
          <Link to="/copyright">Droits d'auteur</Link>
        </div>

        <div className="footer-column">
          <Link to="/etiquette">Étiquette</Link>
          <Link to="/terms-of-use">Conditions d'utilisation</Link>
        </div>

        <div className="footer-column">
          <Link to="/developers">Développeurs</Link>
          <Link to="/help-center">Centre d'aide</Link>
        </div>

        <div className="footer-column">
          <Link to="/author">À propos</Link>
        </div>
      </nav>

      <section>
        <div className="footer-column social-block">
          <a
            href="https://github.com/G-Ludovic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visiter GitHub (ouvre dans un nouvel onglet)"
          >
            <img src="/images/github-mark.svg" alt="logo GitHub" />
          </a>
          <a
            href="https://linkedin.com/in/ludovic-galicher-69ba9932a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visiter LinkedIn (ouvre dans un nouvel onglet)"
          >
            <img src="/images/linkedin.webp" alt="logo Linkedin" />
          </a>
        </div>
      </section>

      <section className="copy-bottom">
        <div className="footer-copy">
          <p>&copy; Jinloup Ludo Art 2025 — Tous droits réservés</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
