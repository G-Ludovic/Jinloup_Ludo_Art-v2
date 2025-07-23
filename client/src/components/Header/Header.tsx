import { Link } from "react-router";
import "./Header.css";
import { useAuth } from "../../services/AuthContext";

function Header() {
  const { isLogged, setIsLogged } = useAuth();

  const handleLogout = () => {
    fetch("http://localhost:3310/api/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => res.ok && setIsLogged(false));
  };

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
          <Link className="login-a" to="/">
            <button type="button" onClick={handleLogout}>
              Se déconnecter
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
