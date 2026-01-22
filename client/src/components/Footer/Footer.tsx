import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="banner-footer">
      <section className="footer-logo">
        <img
          src="/images/logo-ongl.webp"
          alt="logo du site Jinloup Ludo Art"
          className="logo-wolf"
        />
      </section>

      <nav className="footer-links" aria-label="Liens du footer">
        <ul className="footer-column">
          <li>
            <Link to="/privacy-policy">Politique de confidentialité</Link>
          </li>
          <li>
            <Link to="/copyright">Droits d'auteur</Link>
          </li>
        </ul>

        <ul className="footer-column">
          <li>
            <Link to="/etiquette">Étiquette</Link>
          </li>
          <li>
            <Link to="/terms-of-use">Conditions d'utilisation</Link>
          </li>
        </ul>

        <ul className="footer-column">
          <li>
            <Link to="/developers">Développeurs</Link>
          </li>
          <li>
            <Link to="/help-center">Centre d'aide</Link>
          </li>
        </ul>

        <ul className="footer-column">
          <li>
            <Link to="/author">À propos</Link>
          </li>
        </ul>
      </nav>

      <section className="social-block">
        <ul>
          <li>
            <a
              href="https://github.com/G-Ludovic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visiter GitHub (ouvre dans un nouvel onglet)"
            >
              <img src="/images/github-mark.svg" alt="logo GitHub" />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/ludovic-galicher-69ba9932a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visiter LinkedIn (ouvre dans un nouvel onglet)"
            >
              <img src="/images/linkedin.webp" alt="logo Linkedin" />
            </a>
          </li>
        </ul>
      </section>

      <section className="copy-bottom">
        <p>&copy; Jinloup Ludo Art 2025 — Tous droits réservés</p>
      </section>
    </footer>
  );
}

export default Footer;
