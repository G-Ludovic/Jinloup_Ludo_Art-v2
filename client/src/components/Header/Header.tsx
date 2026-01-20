import { Link, useNavigate } from "react-router";
import { useAuth } from "../../services/AuthContext";
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
        <div className="logo-and-card">
          <img
            className="img-logo"
            src="/images/logo-jinloup-ludo-art.webp"
            alt="logo du site"
          />

          {isLogged && (
            <div className="user-card">
              <img
                className="user-avatar"
                src={
                  user?.avatar
                    ? `http://localhost:3310${user.avatar}`
                    : "/images/user-circle.png"
                }
                alt="avatar utilisateur"
              />
              <div className="user-info">
                <span className="user-pseudo">
                  {user?.pseudo || user?.email}
                </span>
                <span className="user-grade">{user?.role}</span>
                <span className="user-status">Connecté</span>
              </div>
            </div>
          )}
        </div>

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

      <nav className="header-nav" aria-label="Navigation principale">
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
      </nav>
    </header>
  );
}

export default Header;
