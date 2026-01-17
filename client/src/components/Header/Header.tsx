import { Link, useNavigate } from "react-router";
import { useAuth } from "../../services/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

function Header() {
  const { isLogged, user, setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setIsLogged(false);
        setUser(null);
        navigate("/"); // redirige vers l'accueil
      }
    });
  };

  return (
    <header className="header">
      <figure className="p-logo">
        <img
          className="img-logo"
          src="/images/logo-jinloup-ludo-art.webp"
          alt="logo du site"
        />

        {isLogged && user?.role === "loup alpha" && (
          <Link className="admin-a" to="/admin">
            🔑 Panel Admin 🔑
          </Link>
        )}
        {isLogged && user?.role === "loup gardien" && (
          <Link className="moderation-a" to="/moderation">
            🛡️ Panel Modération 🛡️
          </Link>
        )}
        {isLogged && user?.role === "jeune loup" && (
          <Link className="profile-a" to="/profile">
            🌙 Mon Profil 🌙
          </Link>
        )}
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
          <button type="button" className="login-a" onClick={handleLogout}>
            Se déconnecter
          </button>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;
