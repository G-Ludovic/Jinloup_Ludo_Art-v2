import { type ChangeEvent, useCallback, useEffect, useState } from "react";
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
  const [file, setFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Crée l’URL pour prévisualisation
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Charger les dessins
  const loadDraws = useCallback(() => {
    fetch("http://localhost:3310/api/draws")
      .then((res) => res.json())
      .then((draws) => {
        setData(draws);
        localStorage.setItem("draws", JSON.stringify(draws)); // Stockage ici
      })
      .catch(() => toast.error("Erreur lors du chargement des dessins"));
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

  // Ajout
  const handleSubmit = (formData: FormData) => {
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

  // Suppression
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3310/api/draws/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        toast.success("Dessin supprimé !");
        // Supprime l’élément du state local
        setData((prevData) =>
          prevData.filter((item: Drawing) => item.id !== id),
        );
        // Retirer du localStorage si stocké dedans
        localStorage.removeItem(`preview-${id}`);
      } else {
        toast.error("❌ Échec de la suppression");
      }
    });
  };

  // Modification
  const handleModify = (id: number, formData: FormData) => {
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
              setFile(undefined);
            }}
            encType="multipart/form-data"
          >
            <label htmlFor="name">Nom de votre création</label>
            <input
              id="name"
              name="name"
              placeholder="Ex: Le Loup d'argent"
              required
            />

            <label htmlFor="image">Votre image</label>
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
                <p>Détails du fichier :</p>
                <ul>
                  <li>Nom : {file.name}</li>
                  <li>Type : {file.type}</li>
                  <li>Taille : {file.size} octets</li>
                </ul>
              </section>
            )}

            <button type="submit">Valider</button>
          </form>
        </article>

        <hr />
        <h2>Créations des membres</h2>
        <hr />
        <article className="draw-member">
          {data.map((el) => (
            <div key={el.id} className="card">
              <Card
                name={el.name}
                image={`http://localhost:3310${el.image}`}
                text=""
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleModify(el.id, formData);
                }}
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="name"
                  defaultValue={el.name}
                  placeholder="Modifier le nom"
                />
                <input type="file" name="image" accept=".png,.jpg,.jpeg" />
                <button type="submit">Modifier</button>
              </form>

              <button type="button" onClick={() => handleDelete(el.id)}>
                Supprimer
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("draws");
                  toast.info("Cache local supprimé.");
                }}
              >
                Vider le cache local
              </button>
            </div>
          ))}
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
