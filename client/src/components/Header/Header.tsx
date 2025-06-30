import { Link } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <figure>
        <img
          className="img-logo"
          src="/images/logo-jinloup-ludo-art.webp"
          alt="logo du site"
        />
      </figure>
      <nav className="header-nav">
        <Link className="home-a" to="/">
          Accueil
        </Link>
        <Link className="gallery-a" to="/gallery">
          Galerie
        </Link>
        <Link className="contact-a" to="/contact">
          Contact
        </Link>

        <Link className="login-a" to="/login">
          <img src="/images/account-login.png" alt="login" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
