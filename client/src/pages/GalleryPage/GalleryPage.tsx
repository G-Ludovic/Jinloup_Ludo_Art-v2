import { type FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card.tsx";
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modifFile, setModifFile] = useState<File | null>(null);
  const [modifPreviewUrl, setModifPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Preview de l'image lors de l'ajout
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  // Preview de l'image lors de la modification
  const handleModifFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (modifPreviewUrl) URL.revokeObjectURL(modifPreviewUrl);
      setModifFile(selectedFile);
      setModifPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (modifPreviewUrl) URL.revokeObjectURL(modifPreviewUrl);
    };
  }, [previewUrl, modifPreviewUrl]);

  // Chargement des dessins
  const loadDraws = useCallback(() => {
    setLoading(true);
    fetch("http://localhost:3310/api/draws")
      .then((res) => res.json())
      .then((draws) => {
        setData(draws);
        localStorage.setItem("draws", JSON.stringify(draws));
      })
      .catch(() => toast.error("Erreur lors du chargement des dessins"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const storedDraws = localStorage.getItem("draws");
    if (storedDraws) {
      try {
        setData(JSON.parse(storedDraws));
      } catch {
        console.warn("Impossible de lire les données du localStorage.");
      }
    }
    loadDraws();
  }, [loadDraws]);

  // Ajout d’un dessin
  const handleSubmit = (formData: FormData) => {
    if (!formData.get("name") || !formData.get("image")) {
      toast.error("Merci de remplir tous les champs !");
      return;
    }

    fetch("http://localhost:3310/api/draws", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        toast.success("🎉 Bravo, dessin ajouté !");
        loadDraws();
      } else {
        toast.error("❌ Échec de la création");
      }
    });
  };

  // Suppression d’un dessin
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3310/api/draws/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        toast.success("Dessin supprimé !");
        setData((prevData) => prevData.filter((item) => item.id !== id));
        localStorage.removeItem(`preview-${id}`);
      } else {
        toast.error("❌ Échec de la suppression");
      }
    });
  };

  // Modification d’un dessin
  const handleModify = (e: FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    fetch(`http://localhost:3310/api/draws/${id}`, {
      method: "PUT",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        toast.success("Modification effectuée !");
        loadDraws();
      } else {
        toast.error("❌ Échec de la modification");
      }
      setEditingId(null);
      setModifFile(null);
      if (modifPreviewUrl) {
        URL.revokeObjectURL(modifPreviewUrl);
        setModifPreviewUrl(null);
      }
    });
  };

  return (
    <>
      <h1>Galerie</h1>
      <main className="gallery-page">
        <hr />
        <h2>Proposez vos créations</h2>
        <hr />
        <article className="add-draw">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
              e.currentTarget.reset();
              setFile(null);
              setPreviewUrl(null);
            }}
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
              required
            />

            <label htmlFor="image">
              <h4>⬇️ Votre image ⬇️</h4>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFile}
              required
            />

            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="Aperçu" className="preview-img" />
              </div>
            )}

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
                    aria-label={`Modifier le dessin ${el.name}`}
                    onClick={() => {
                      setEditingId(el.id);
                      setModifFile(null);
                      if (modifPreviewUrl) {
                        URL.revokeObjectURL(modifPreviewUrl);
                        setModifPreviewUrl(null);
                      }
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    aria-label={`Supprimer le dessin ${el.name}`}
                    onClick={() => handleDelete(el.id)}
                  >
                    Supprimer
                  </button>
                </div>

                {editingId === el.id && (
                  <dialog open>
                    <p>⬇️ Nouvelle image à sélectionner ⬇️</p>
                    <form
                      onSubmit={(e) => handleModify(e, el.id)}
                      encType="multipart/form-data"
                    >
                      <input
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleModifFile}
                        required
                      />

                      {modifPreviewUrl && (
                        <div className="preview-container">
                          <img
                            src={modifPreviewUrl}
                            alt="Aperçu de la modification"
                            className="preview-img"
                          />
                        </div>
                      )}

                      {modifFile && (
                        <section>
                          <h3>Détails du fichier :</h3>
                          <table className="details-table">
                            <tbody>
                              <tr>
                                <th>Nom :</th>
                                <td>{modifFile.name}</td>
                              </tr>
                              <tr>
                                <th>Type :</th>
                                <td>{modifFile.type}</td>
                              </tr>
                              <tr>
                                <th>Taille :</th>
                                <td>
                                  {modifFile.size.toLocaleString()} octets
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </section>
                      )}

                      <button type="submit">Valider</button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setModifFile(null);
                          if (modifPreviewUrl) {
                            URL.revokeObjectURL(modifPreviewUrl);
                            setModifPreviewUrl(null);
                          }
                        }}
                      >
                        Annuler
                      </button>
                    </form>
                  </dialog>
                )}
              </div>
            ))
          )}
        </article>

        <hr />
        <h2>Créations de Jinloup</h2>
        <hr />
        <article className="gallery-article">
          {drawings.map((drawing) => (
            <div key={drawing.id} className="card">
              <a
                className="click-link"
                href={drawing.art}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="draw-img"
                  src={drawing.art}
                  alt={drawing.name || `Dessin #${drawing.id}`}
                />
              </a>
              <p>{drawing.name || `Dessin #${drawing.id}`}</p>
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export default GalleryPage;
