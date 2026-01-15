import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./MembersPage.css";

interface Member {
  id: number;
  pseudo: string;
  email: string;
  role: string;
}

const roles = [
  { label: "Alpha Loup/Louve", value: "loup alpha" },
  { label: "Gardien Loup/Louve", value: "loup gardien" },
  { label: "Jeune Loup/Louve", value: "jeune loup" },
];

function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveId, setSaveId] = useState<number | null>(null);

  // Récupération des membres
  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/users", {
        credentials: "include",
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
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/users/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
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
  const handleEdit = (id: number, role: string) => {
    setEditingId(id);
    setEditedRole(role);
  };

  // Sauvegarder la modification
  const handleSave = (id: number) => {
    setSaveId(id);
    setShowSaveModal(true);
  };

  const confirmSave = async () => {
    if (!saveId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${saveId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: editedRole }),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      setMembers((prev) =>
        prev.map((m) => (m.id === saveId ? { ...m, role: editedRole } : m)),
      );
      setEditingId(null);
      toast.success("Rôle mis à jour avec succès !");
    } catch (err) {
      toast.error(`${(err as Error).message}`);
    } finally {
      setSaving(false);
      setShowSaveModal(false);
      setSaveId(null);
    }
  };

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
        <table className="members-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.pseudo}</td>
                <td>{m.email}</td>
                <td>
                  {editingId === m.id ? (
                    <select
                      value={editedRole}
                      onChange={(e) => setEditedRole(e.target.value)}
                    >
                      {roles.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className={`role ${m.role}`}>{m.role}</span>
                  )}
                </td>
                <td>
                  {editingId === m.id ? (
                    <>
                      <button
                        type="button"
                        className="btn-save"
                        onClick={() => handleSave(m.id)}
                        disabled={saving}
                      >
                        {saving ? "..." : "Enregistrer"}
                      </button>
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setEditingId(null)}
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => handleEdit(m.id, m.role)}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => handleDelete(m.id)}
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmer la suppression</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer ce membre ? Cette action
              supprimera également tout son contenu associé.
            </p>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={confirmDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmer la modification</h3>
            <p>Êtes-vous sûr de vouloir changer le rôle de ce membre ?</p>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowSaveModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn-confirm-save"
                onClick={confirmSave}
                disabled={saving}
              >
                {saving ? "..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembersPage;
