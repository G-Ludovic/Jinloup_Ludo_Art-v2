import { Link } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <figure>
        <img
          className="img-logo"
          src="/public/images/logo-jinloup-ludo-art.webp"
          alt="logo du site"
        />
      </figure>
      <nav className="header-nav">
        <Link to="/">Accueil</Link>
        <Link to="/gallery">Galerie</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
