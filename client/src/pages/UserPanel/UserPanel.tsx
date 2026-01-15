import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { useAuth } from "../../services/AuthContext";
import "../../components/ConfirmationModal/ConfirmationModal.css";
import "./UserPanel.css";

function UserPanel() {
  const { user, setUser } = useAuth();
  const [activePage, setActivePage] = useState("profile");
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Rôles disponibles selon le rôle de l'utilisateur (pour les jeunes loups, seulement leur propre rôle)
  const getAvailableRoles = (userRole: string) => {
    if (userRole === "jeune loup") {
      return [{ label: "Jeune Loup/Louve", value: "jeune loup" }];
    }
    return [{ label: "Jeune Loup/Louve", value: "jeune loup" }];
  };

  // Load current user data
  useEffect(() => {
    if (user) {
      setPseudo(user.pseudo || "");
      setRole(user.role || "");
      setBio(user.bio || "");
      if (user.avatar) {
        setPreviewUrl(`http://localhost:3310${user.avatar}`);
      }
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const confirmSave = async () => {
    if (!user) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pseudo", pseudo);
    formData.append("role", role);
    formData.append("bio", bio);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser); // Update context
        toast.success("Profil mis à jour avec succès !");
      } else {
        toast.error("Échec de la mise à jour");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
      setShowSaveModal(false);
    }
  };

  return (
    <div className="user-container">
      {/* Sidebar */}
      <aside className="user-sidebar">
        <h2>JinLoup Profil 🌙</h2>
        <nav>
          <ul>
            <li>
              <button
                type="button"
                className={activePage === "profile" ? "active" : ""}
                onClick={() => setActivePage("profile")}
              >
                Mon Profil
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "stats" ? "active" : ""}
                onClick={() => setActivePage("stats")}
              >
                Mes Statistiques
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="user-main">
        <header className="user-header">
          <h1>Mon Espace Personnel 🐺</h1>
        </header>

        {activePage === "profile" && (
          <section className="user-profile">
            <h3>Paramètres du profil</h3>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="pseudo">Pseudo</label>
                <input
                  id="pseudo"
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  {getAvailableRoles(user?.role || "").map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Biographie</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="Racontez votre histoire..."
                />
              </div>

              <div className="form-group">
                <p
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Avatar
                </p>
                <div className="avatar-section">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Avatar"
                      className="avatar-preview"
                    />
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="btn-upload"
                  >
                    Choisir un avatar
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-save">
                {loading ? "Mise à jour..." : "Sauvegarder"}
              </button>
            </form>

            <ConfirmationModal
              isOpen={showSaveModal}
              title="Confirmer la sauvegarde"
              message="Êtes-vous sûr de vouloir sauvegarder ces modifications ?"
              onConfirm={confirmSave}
              onCancel={() => setShowSaveModal(false)}
              loading={loading}
            />
          </section>
        )}

        {activePage === "stats" && (
          <section className="user-stats">
            <h3>Mes statistiques de messages</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Aujourd'hui</h4>
                <p className="stat-number">2</p>
              </div>
              <div className="stat-card">
                <h4>Cette semaine</h4>
                <p className="stat-number">8</p>
              </div>
              <div className="stat-card">
                <h4>Ce mois</h4>
                <p className="stat-number">12</p>
              </div>
              <div className="stat-card">
                <h4>Total</h4>
                <p className="stat-number">45</p>
              </div>
            </div>
            <div className="activity-chart">
              <h4>Activité récente</h4>
              <div className="chart-placeholder">
                <p>📊 Graphique d'activité à venir</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default UserPanel;
