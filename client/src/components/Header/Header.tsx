import { Link } from "react-router";
import "./Header.css";
import { useAuth } from "../../services/AuthContext";

function Header() {
  const { isLogged } = useAuth();

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
        <Link className="forum-a" to="/forum">
          Forum
        </Link>
        <Link className="contact-a" to="/contact">
          Contact
        </Link>
        <Link className="registration-a" to="/registration">
          Inscription
        </Link>
        {!isLogged ? (
          <Link className="login-a" to="/login">
            Se connecter
          </Link>
        ) : (
          <button type="button">Se déconnecter</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
