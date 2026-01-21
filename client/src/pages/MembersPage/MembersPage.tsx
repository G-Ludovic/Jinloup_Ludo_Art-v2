import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { useAuth } from "../../services/AuthContext";
import "./MembersPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

interface Member {
  id: number;
  pseudo: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
}

// Rôles disponibles selon le rôle de l'utilisateur
const getAvailableRoles = (isModerator: boolean) => {
  if (isModerator) {
    return [
      { label: "Gardien Loup/Louve", value: "loup gardien" },
      { label: "Jeune Loup/Louve", value: "jeune loup" },
    ];
  }
  return [
    { label: "Alpha Loup/Louve", value: "loup alpha" },
    { label: "Gardien Loup/Louve", value: "loup gardien" },
    { label: "Jeune Loup/Louve", value: "jeune loup" },
  ];
};

function MembersPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [editedPseudo, setEditedPseudo] = useState("");
  const [editedRoleValue, setEditedRoleValue] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [editedAvatarFile, setEditedAvatarFile] = useState<File | null>(null);
  const [editedPreviewUrl, setEditedPreviewUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Déterminer si l'utilisateur est modérateur (gardien)
  const isModerator = user?.role === "loup gardien";

  // Récupération des membres
  const fetchMembers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError((err as Error).message);
      toast.error("❌ Impossible de charger les membres.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Suppression d’un membre
  const handleDelete = (id: number, role: string) => {
    if (isModerator && role === "loup alpha") {
      toast.error("Vous ne pouvez pas supprimer un administrateur.");
      return;
    }
    setDropdownOpen(null); // Fermer le dropdown
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/users/${deleteId}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== deleteId));
        toast.success("Membre supprimé avec succès !");
      } else {
        toast.error("Erreur lors de la suppression du membre.");
      }
    } catch {
      toast.error("Impossible de supprimer ce membre.");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Activer le mode édition
  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setEditedPseudo(member.pseudo || "");
    setEditedRoleValue(member.role || "");
    setEditedBio(""); // On pourrait récupérer la bio si disponible
    setEditedAvatarFile(null);
    setEditedPreviewUrl(
      member.avatar ? `http://localhost:3310${member.avatar}` : null,
    );
    setDropdownOpen(null); // Fermer le dropdown
  };

  // Sauvegarder la modification du profil
  const handleSaveProfile = () => {
    setShowSaveModal(true);
  };

  const confirmSaveProfile = async () => {
    if (!editingMember) return;
    console.log("API_URL in MembersPage:", API_URL);
    setSaving(true);
    const formData = new FormData();
    formData.append("pseudo", editedPseudo);
    formData.append("role", editedRoleValue);
    formData.append("bio", editedBio);
    if (editedAvatarFile) {
      formData.append("avatar", editedAvatarFile);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/users/${editingMember.id}`, {
        method: "PUT",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const updatedMember = await res.json();
        setMembers((prev) =>
          prev.map((m) => (m.id === editingMember.id ? updatedMember : m)),
        );
        setEditingMember(null);
        toast.success("Profil mis à jour avec succès !");
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    } catch (err) {
      toast.error(`${(err as Error).message}`);
    } finally {
      setSaving(false);
      setShowSaveModal(false);
    }
  };

  // Gérer le changement d'avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedAvatarFile(file);
      setEditedPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Fermer l'édition
  const handleCancelEdit = () => {
    setEditingMember(null);
    setEditedAvatarFile(null);
    setEditedPreviewUrl(null);
  };

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Chargement initial
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (loading) return <p>Chargement des membres...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

  return (
    <div className="members-container">
      <h2>Gestion des membres 🐾</h2>
      {members.length === 0 ? (
        <p>Aucun membre trouvé.</p>
      ) : (
        <table
          ref={tableRef}
          className="members-table"
          aria-label="Liste des membres"
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Pseudo</th>
              <th scope="col">Email</th>
              <th scope="col">Rôle</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.pseudo}</td>
                <td>{m.email}</td>
                <td>
                  <span className={`role ${m.role}`}>{m.role}</span>
                </td>
                <td>
                  <div className="actions-container">
                    <button
                      type="button"
                      className="btn-menu"
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === m.id ? null : m.id)
                      }
                    >
                      ⋮
                    </button>
                    {dropdownOpen === m.id && (
                      <div className="dropdown-menu">
                        <button
                          type="button"
                          className="dropdown-item modify"
                          onClick={() => handleEdit(m)}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          className="dropdown-item delete"
                          onClick={() => handleDelete(m.id, m.role)}
                          disabled={isModerator && m.role === "loup alpha"}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Section d'édition du profil */}
      {editingMember && (
        <div className="edit-profile-section">
          <h3>Modifier le profil de {editingMember.pseudo}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
            className="edit-profile-form"
          >
            <div className="form-group">
              <label htmlFor="edit-pseudo">Pseudo</label>
              <input
                id="edit-pseudo"
                type="text"
                value={editedPseudo}
                onChange={(e) => setEditedPseudo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-role">Rôle</label>
              <select
                id="edit-role"
                value={editedRoleValue}
                onChange={(e) => setEditedRoleValue(e.target.value)}
                required
              >
                {getAvailableRoles(isModerator).map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-bio">Biographie</label>
              <textarea
                id="edit-bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                rows={4}
                placeholder="Racontez son histoire..."
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
                {editedPreviewUrl && (
                  <img
                    src={editedPreviewUrl}
                    alt="Avatar"
                    className="avatar-preview"
                  />
                )}
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="btn-upload"
                >
                  Choisir un avatar
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={saving} className="btn-save">
                {saving ? "Mise à jour..." : "Sauvegarder"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn-cancel"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce membre ? Cette action supprimera également tout son contenu associé."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ConfirmationModal
        isOpen={showSaveModal}
        title="Confirmer la modification"
        message="Êtes-vous sûr de vouloir modifier ce profil ?"
        onConfirm={confirmSaveProfile}
        onCancel={() => setShowSaveModal(false)}
        loading={saving}
      />
    </div>
  );
}

export default MembersPage;
