import type { FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card.tsx";
import { Carousel } from "../../components/Carousel/Carousel.tsx";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.tsx";
import EditModal from "../../components/EditModal/EditModal.tsx";
import { drawings } from "../../data/drawings.ts";
import "./GalleryPage.css";

interface Drawing {
  id: number;
  name: string;
  image: string;
}

function GalleryPage() {
  const [data, setData] = useState<Drawing[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDraw, setEditingDraw] = useState<Drawing | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const dropRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Nettoyage des previews
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Chargement des dessins
  const loadDraws = useCallback(() => {
    setLoading(true);
    fetch("/api/draws", { credentials: "include" })
      .then((res) => res.json())
      .then((draws) => {
        setData(draws);
        localStorage.setItem("draws", JSON.stringify(draws));
      })
      .catch(() => toast.error("Erreur lors du chargement des dessins"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("draws");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        console.warn("Erreur lecture localStorage");
      }
    }
    loadDraws();
  }, [loadDraws]);

  // Drag & Drop Ajout
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
    dropRef.current?.classList.remove("drag-active");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.add("drag-active");
  };

  const handleDragLeave = () => {
    dropRef.current?.classList.remove("drag-active");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // Ajout de dessin
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (file) formData.set("image", file);

    fetch("/api/draws", {
      method: "POST",
      body: formData,
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        toast.success("Dessin ajouté avec succès !");
        loadDraws();
        // reset automatique
        formRef.current?.reset();
        setFile(null);
        setPreviewUrl(null);
      } else {
        toast.error("Échec de la création");
      }
    });
  };

  // Suppression
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/draws/${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      toast.success("Dessin supprimé !");
      setData((prev) => prev.filter((item) => item.id !== deleteId));
    } else {
      toast.error("Échec de la suppression");
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Modification via modal
  const handleConfirmEdit = (newName: string, newFile?: File) => {
    if (!editingDraw) return;

    // Vérification obligatoire
    if (!newFile && newName === editingDraw.name) {
      toast.error("Vous devez modifier au moins le titre ou l'image !");
      return;
    }

    const formData = new FormData();
    formData.append("name", newName);
    if (newFile) formData.append("image", newFile);

    fetch(`/api/draws/${editingDraw.id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        toast.success("Dessin modifié avec succès !");
        loadDraws();
      } else {
        toast.error("Échec de la modification");
      }
      setIsModalOpen(false);
      setEditingDraw(null);
    });
  };

  return (
    <>
      <h1>Galerie</h1>
      <main className="gallery-page">
        <hr />
        <h2>Proposez vos créations</h2>
        <hr />

        {/* Formulaire d'ajout */}
        <article className="add-draw">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <label htmlFor="name">
              <h3>Nom de votre création</h3>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Le Loup d'argent"
              maxLength={18}
              required
            />

            <div
              ref={dropRef}
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Aperçu" className="preview-img" />
                  <p>╰┈➤ Glissez une nouvelle image ici pour la remplacer</p>
                </>
              ) : (
                <p>╰┈➤ Glissez une image ici ou cliquez pour en ajouter une</p>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {file && (
              <section>
                <h3>Détails du fichier :</h3>
                <table className="details-table">
                  <tbody>
                    <tr>
                      <th>Nom :</th>
                      <td>{file.name}</td>
                    </tr>
                    <tr>
                      <th>Type :</th>
                      <td>{file.type}</td>
                    </tr>
                    <tr>
                      <th>Taille :</th>
                      <td>{file.size.toLocaleString()} octets</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            )}

            <button type="submit">Valider</button>
          </form>
        </article>

        <hr />
        <h2>Créations des membres</h2>
        <hr />

        {/* Galeries des membres */}
        <article className="draw-member">
          {loading ? (
            <p>Chargement des dessins...</p>
          ) : (
            data.map((el) => (
              <div key={el.id} className="card">
                <a
                  href={`http://localhost:3310${el.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="click-link"
                  title={`Voir ${el.name} en grand`}
                >
                  <Card
                    name={el.name}
                    image={`http://localhost:3310${el.image}`}
                    text=""
                  />
                </a>

                <div className="member-card-btn">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => {
                      setEditingDraw(el);
                      setIsModalOpen(true);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(el.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </article>

        <hr />
        <h2>Créations de Jinloup</h2>
        <hr />
        <div className="carousel-article">
          <Carousel data={drawings} />
        </div>
      </main>

      {/* Modale de suppression */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cette œuvre ? Cette action est irréversible."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Modale d'édition */}
      {editingDraw && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingDraw(null);
          }}
          initialText={editingDraw.name}
          initialImage={editingDraw.image}
          onConfirm={handleConfirmEdit}
          mode="gallery"
        />
      )}
    </>
  );
}

export default GalleryPage;
