import { Link, useNavigate } from "react-router";
import { useAuth } from "../../services/AuthContext";
import "./Header.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

function Header() {
  const { isLogged, user, setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) {
      localStorage.removeItem("token");
      setIsLogged(false);
      setUser(null);
      navigate("/"); // redirige vers l'accueil
    }
  };

  return (
    <header className="header">
      <section className="p-logo">
        <div className="logo-and-card">
          <Link to="/">
            <img
              className="img-logo"
              src="/images/logo-jinloup-ludo-art.webp"
              alt="logo du site"
            />
          </Link>

          {isLogged && (
            <div className="user-card">
              <img
                className="user-avatar"
                src={
                  user?.avatar
                    ? `${API_URL}${user.avatar}`
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
                <div className="user-space-button">
                  {user?.role === "loup alpha" && (
                    <Link className="admin-a" to="/admin">
                      🔑 Mon espace Admin 🔑
                    </Link>
                  )}
                  {user?.role === "loup gardien" && (
                    <Link className="moderation-a" to="/moderation">
                      🛡️ Mon espace Modération 🛡️
                    </Link>
                  )}
                  {user?.role === "jeune loup" && (
                    <Link className="profile-a" to="/profile">
                      🌙 Mon espace Membre 🌙
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

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
