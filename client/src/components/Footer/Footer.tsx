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

      <section className="footer-links">
        <div className="footer-column">
          <article className="footer-title">
            <h3>Jinloup Ludo Art</h3>
          </article>
          <Link to="/author" className="link-about">
            À propos
          </Link>
          <Link to="/contact" className="link-about">
            Contact
          </Link>
        </div>

        <div className="footer-column">
          <Link to="" className="link-about">
            Politique de confidentialité
          </Link>
          <Link to="" className="link-about">
            Droits d'auteur
          </Link>
        </div>

        <div className="footer-column">
          <Link to="" className="link-about">
            Étiquette
          </Link>
          <Link to="" className="link-about">
            Conditions d'utilisation
          </Link>
        </div>

        <div className="footer-column">
          <Link to="" className="link-about">
            Développeurs
          </Link>
          <Link to="" className="link-about">
            Centre d'aide
          </Link>
        </div>
      </section>

      <section>
        <div className="footer-column social-block">
          <a
            href="https://github.com/G-Ludovic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/github-mark.svg" alt="logo GitHub" />
          </a>
          <a
            href="https://linkedin.com/in/ludovic-galicher-69ba9932a"
            target="_blank"
            rel="noopener noreferrer"
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
