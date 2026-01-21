import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import "./MessagesPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

interface Message {
  id: number;
  content: string;
  sending_date: string;
  user_id: number;
  subject_id: number;
  user_name: string;
  subject_title: string;
}

interface Drawing {
  id: number;
  name: string;
  image: string;
  user_name: string;
  user_id: number;
}

function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "drawings">(
    "messages",
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"message" | "drawing">(
    "message",
  );
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [filteredDrawings, setFilteredDrawings] = useState<Drawing[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [drawingAuthorFilter, setDrawingAuthorFilter] = useState<string>("");
  const [subjects, setSubjects] = useState<{ id: number; title: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [drawingAuthors, setDrawingAuthors] = useState<
    { id: number; name: string }[]
  >([]);

  // Récupération des messages
  const fetchMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/message`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setMessages(data);
      setFilteredMessages(data);

      // Extraire les sujets et auteurs uniques
      const uniqueSubjects = Array.from(
        new Map(
          data.map((m: Message) => [
            m.subject_id,
            { id: m.subject_id, title: m.subject_title || "" },
          ]),
        ).values(),
      ) as { id: number; title: string }[];
      const uniqueAuthors = Array.from(
        new Map(
          data.map((m: Message) => [
            m.user_id,
            { id: m.user_id, name: m.user_name || "" },
          ]),
        ).values(),
      ) as { id: number; name: string }[];

      setSubjects(uniqueSubjects);
      setAuthors(uniqueAuthors);
    } catch (err) {
      setError((err as Error).message);
      toast.error("Impossible de charger les messages du forum.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupération des dessins
  const fetchDrawings = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/draws`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setDrawings(data);
      setFilteredDrawings(data);

      // Extraire les auteurs uniques pour les dessins
      const uniqueDrawingAuthors = Array.from(
        new Map(
          data
            .filter((d: Drawing) => d.user_id) // Filtrer les dessins sans user_id
            .map((d: Drawing) => [
              d.user_id,
              { id: d.user_id, name: d.user_name || "" },
            ]),
        ).values(),
      ) as { id: number; name: string }[];

      setDrawingAuthors(uniqueDrawingAuthors);
    } catch (err) {
      setError((err as Error).message);
      toast.error("Impossible de charger les œuvres de la galerie.");
    }
  }, []);

  // Suppression d'un élément (message ou dessin)
  const handleDelete = (id: number, type: "message" | "drawing") => {
    setDeleteId(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  // Affichage du contenu complet d'un message
  const handleViewContent = (message: Message) => {
    setSelectedMessage(message);
    setShowContentModal(true);
  };

  // Affichage d'une image de dessin
  const handleViewImage = (drawing: Drawing) => {
    setSelectedDrawing(drawing);
    setShowImageModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const endpoint =
        deleteType === "message"
          ? `/api/message/${deleteId}`
          : `/api/draws/${deleteId}`;
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        if (deleteType === "message") {
          setMessages((prev) => prev.filter((m) => m.id !== deleteId));
          toast.success("Message supprimé du forum avec succès !");
        } else {
          setDrawings((prev) => prev.filter((d) => d.id !== deleteId));
          toast.success("Œuvre supprimée de la galerie avec succès !");
        }
      } else {
        const actionType =
          deleteType === "message"
            ? "supprimer ce message"
            : "supprimer cette œuvre";
        toast.error(`Impossible de ${actionType}. Vérifiez vos permissions.`);
      }
    } catch {
      toast.error(
        `Erreur réseau lors de la suppression du ${deleteType === "message" ? "message" : "dessin"}.`,
      );
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
      setDeleteType("message");
    }
  };

  // Filtrage des messages
  useEffect(() => {
    let filtered = messages;

    if (subjectFilter) {
      filtered = filtered.filter(
        (m) => m.subject_id === Number.parseInt(subjectFilter),
      );
    }

    if (authorFilter) {
      filtered = filtered.filter(
        (m) => m.user_id === Number.parseInt(authorFilter),
      );
    }

    setFilteredMessages(filtered);
  }, [messages, subjectFilter, authorFilter]);

  // Filtrage des dessins
  useEffect(() => {
    let filtered = drawings.filter((d) => d.user_id); // Exclure les dessins sans user_id

    if (drawingAuthorFilter) {
      filtered = filtered.filter(
        (d) => d.user_id === Number.parseInt(drawingAuthorFilter),
      );
    }

    setFilteredDrawings(filtered);
  }, [drawings, drawingAuthorFilter]);

  // Chargement initial
  useEffect(() => {
    fetchMessages();
    fetchDrawings();
  }, [fetchMessages, fetchDrawings]);

  if (loading) return <p>Chargement des messages...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

  return (
    <div className="messages-container">
      <h2>Gestion des contenus 🗣️🎨</h2>

      {/* Onglets */}
      <div className="tab-container">
        <button
          type="button"
          className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === "drawings" ? "active" : ""}`}
          onClick={() => setActiveTab("drawings")}
        >
          Œuvres
        </button>
      </div>

      {/* Filtres */}
      {activeTab === "messages" ? (
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="subject-filter">Filtrer par sujet :</label>
            <select
              id="subject-filter"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="">Tous les sujets</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id.toString()}>
                  {subject.title}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="author-filter">Filtrer par auteur :</label>
            <select
              id="author-filter"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
            >
              <option value="">Tous les auteurs</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id.toString()}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {(subjectFilter || authorFilter) && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={() => {
                setSubjectFilter("");
                setAuthorFilter("");
              }}
            >
              Effacer les filtres
            </button>
          )}
        </div>
      ) : (
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="drawing-author-filter">Filtrer par auteur :</label>
            <select
              id="drawing-author-filter"
              value={drawingAuthorFilter}
              onChange={(e) => setDrawingAuthorFilter(e.target.value)}
            >
              <option value="">Tous les auteurs</option>
              {drawingAuthors.map((author) => (
                <option key={author.id} value={author.id.toString()}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {drawingAuthorFilter && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={() => setDrawingAuthorFilter("")}
            >
              Effacer les filtres
            </button>
          )}
        </div>
      )}

      {activeTab === "messages" ? (
        filteredMessages.length === 0 ? (
          <p>Aucun message trouvé.</p>
        ) : (
          <table className="messages-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Contenu</th>
                <th>Auteur</th>
                <th>Sujet</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>
                    {m.content.length > 50 ? (
                      <>
                        {`${m.content.substring(0, 50)}...`}
                        <button
                          type="button"
                          className="btn-view"
                          onClick={() => handleViewContent(m)}
                        >
                          Voir
                        </button>
                      </>
                    ) : (
                      m.content
                    )}
                  </td>
                  <td>{m.user_name || "Inconnu"}</td>
                  <td>{m.subject_title || "Inconnu"}</td>
                  <td>{new Date(m.sending_date).toLocaleDateString()}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDelete(m.id, "message")}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : filteredDrawings.length === 0 ? (
        <p>Aucune œuvre trouvée.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Auteur</th>
              <th>Aperçu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrawings.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.user_name || "Inconnu"}</td>
                <td>
                  <img
                    src={`${API_URL}${d.image}`}
                    alt={d.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewImage(d)}
                    onKeyDown={(e) => e.key === "Enter" && handleViewImage(d)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDelete(d.id, "drawing")}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer ce ${deleteType === "message" ? "message" : "dessin"} ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Modal pour afficher le contenu complet */}
      {showContentModal && selectedMessage && (
        <div
          className="modal-overlay"
          onClick={() => setShowContentModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowContentModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
          >
            <h3>Message complet</h3>
            <div className="message-details">
              <p>
                <strong>ID:</strong> {selectedMessage.id}
              </p>
              <p>
                <strong>Auteur:</strong>{" "}
                {selectedMessage.user_name || "Inconnu"}
              </p>
              <p>
                <strong>Sujet:</strong>{" "}
                {selectedMessage.subject_title || "Inconnu"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedMessage.sending_date).toLocaleString()}
              </p>
              <p>
                <strong>Contenu:</strong>
              </p>
              <div className="message-content">{selectedMessage.content}</div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowContentModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour afficher l'image complète */}
      {showImageModal && selectedDrawing && (
        <div
          className="modal-overlay"
          onClick={() => setShowImageModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowImageModal(false)}
        >
          <div
            className="modal-content image-modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
          >
            <h3>{selectedDrawing.name}</h3>
            <div className="drawing-details">
              <p>
                <strong>ID:</strong> {selectedDrawing.id}
              </p>
              <p>
                <strong>Auteur:</strong>{" "}
                {selectedDrawing.user_name || "Inconnu"}
              </p>
              <div className="image-container">
                <img
                  src={`${API_URL}${selectedDrawing.image}`}
                  alt={selectedDrawing.name}
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowImageModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
