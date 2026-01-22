import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { fetchAuth } from "../../api";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { API_URL } from "../../config";
import { useAuth } from "../../services/AuthContext";
import type { User } from "../../types/auth";
import "../../components/ConfirmationModal/ConfirmationModal.css";
import "./SettingsPage.css";

// Constants
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB

// User roles constants
const USER_ROLES = {
  ALPHA: "loup alpha",
  GARDIEN: "loup gardien",
  JEUNE: "jeune loup",
} as const;

// Role options mapping
const ROLE_OPTIONS = {
  [USER_ROLES.GARDIEN]: [
    { label: "Gardien Loup/Louve", value: USER_ROLES.GARDIEN },
    { label: "Jeune Loup/Louve", value: USER_ROLES.JEUNE },
  ],
  [USER_ROLES.ALPHA]: [
    { label: "Alpha Loup/Louve", value: USER_ROLES.ALPHA },
    { label: "Gardien Loup/Louve", value: USER_ROLES.GARDIEN },
    { label: "Jeune Loup/Louve", value: USER_ROLES.JEUNE },
  ],
  [USER_ROLES.JEUNE]: [
    { label: "Alpha Loup/Louve", value: USER_ROLES.ALPHA },
    { label: "Gardien Loup/Louve", value: USER_ROLES.GARDIEN },
    { label: "Jeune Loup/Louve", value: USER_ROLES.JEUNE },
  ],
} as const;

// Types
interface RoleOption {
  readonly label: string;
  readonly value: string;
}

interface FormErrors {
  pseudo?: string;
  email?: string;
  role?: string;
  bio?: string;
  avatar?: string;
}

function SettingsPage() {
  const { user, setUser } = useAuth();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Available roles based on user's current role
  const availableRoles: readonly RoleOption[] = useMemo(() => {
    if (!user?.role) return [];
    return ROLE_OPTIONS[user.role as keyof typeof ROLE_OPTIONS] || [];
  }, [user?.role]);

  // Load user data
  useEffect(() => {
    if (user) {
      setPseudo(user.pseudo || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setBio(user.bio || "");
      if (user.avatar) {
        setPreviewUrl(`${API_URL}${user.avatar}`);
      }
    }
  }, [user]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Validation functions
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePseudo = useCallback((pseudo: string): boolean => {
    return pseudo.trim().length >= 2 && pseudo.trim().length <= 50;
  }, []);

  const validateBio = useCallback((bio: string): boolean => {
    return bio.length <= 500;
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    if (!validatePseudo(pseudo)) {
      errors.pseudo = "Le pseudo doit contenir entre 2 et 50 caractères.";
    }

    if (!validateEmail(email)) {
      errors.email = "Veuillez saisir une adresse email valide.";
    }

    if (user?.role !== USER_ROLES.JEUNE && !role) {
      errors.role = "Veuillez sélectionner un rôle.";
    }

    if (!validateBio(bio)) {
      errors.bio = "La biographie ne doit pas dépasser 500 caractères.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [
    pseudo,
    email,
    role,
    bio,
    user?.role,
    validatePseudo,
    validateEmail,
    validateBio,
  ]);

  // Handlers
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Veuillez sélectionner un fichier image valide.");
        setFormErrors((prev) => ({
          ...prev,
          avatar: "Type de fichier non supporté.",
        }));
        return;
      }

      if (file.size > MAX_AVATAR_SIZE) {
        toast.error("La taille du fichier doit être inférieure à 5 Mo.");
        setFormErrors((prev) => ({
          ...prev,
          avatar: "Fichier trop volumineux (max 5 Mo).",
        }));
        return;
      }

      // Clear previous errors
      setFormErrors((prev) => ({ ...prev, avatar: undefined }));

      // Revoke previous object URL
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;
      setAvatarFile(file);
      setPreviewUrl(newUrl);
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        toast.error("Veuillez corriger les erreurs dans le formulaire.");
        return;
      }
      setShowSaveModal(true);
    },
    [validateForm],
  );

  const confirmSave = useCallback(async () => {
    if (!user) {
      toast.error("Utilisateur non connecté.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("pseudo", pseudo.trim());
    formData.append("email", email.trim());
    formData.append("role", role);
    formData.append("bio", bio.trim());
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const data = await fetchAuth<User>(`/api/users/${user.id}`, {
        method: "PUT",
        body: formData,
        headers: {}, // Override for FormData
      });

      if (data) {
        setUser(data);
        toast.success("Paramètres mis à jour avec succès !");
        // Reload page to update Header immediately
        window.location.reload();
      } else {
        toast.error("Échec de la mise à jour. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur réseau. Veuillez vérifier votre connexion.");
    } finally {
      setLoading(false);
      setShowSaveModal(false);
    }
  }, [user, pseudo, email, role, bio, avatarFile, setUser]);

  return (
    <div className="settings-container">
      <h2>Profil du compte :</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <p style={{ marginBottom: "0.5rem", fontWeight: 600, color: "#333" }}>
            Avatar
          </p>
          <div className="avatar-section">
            <button
              type="button"
              className="avatar-upload-area"
              onClick={() => fileRef.current?.click()}
              aria-label="Cliquer pour choisir un avatar"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar actuel"
                  className="avatar-preview"
                />
              ) : (
                <span className="avatar-placeholder">
                  Cliquer pour ajouter un avatar
                </span>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              aria-label="Sélectionner un fichier image pour l'avatar"
            />
          </div>
          {formErrors.avatar && (
            <span style={{ color: "red", fontSize: "0.9em" }}>
              {formErrors.avatar}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          {formErrors.pseudo && (
            <span style={{ color: "red", fontSize: "0.9em" }}>
              {formErrors.pseudo}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {formErrors.email && (
            <span style={{ color: "red", fontSize: "0.9em" }}>
              {formErrors.email}
            </span>
          )}
        </div>

        {user?.role !== USER_ROLES.JEUNE && (
          <div className="form-group">
            <label htmlFor="role">Rôle</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              {availableRoles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {formErrors.role && (
              <span style={{ color: "red", fontSize: "0.9em" }}>
                {formErrors.role}
              </span>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="bio">Biographie</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Racontez votre histoire..."
          />
          {formErrors.bio && (
            <span style={{ color: "red", fontSize: "0.9em" }}>
              {formErrors.bio}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-save"
          aria-label="Sauvegarder les modifications"
        >
          {loading ? "⏳" : "✓"}
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
    </div>
  );
}

export default SettingsPage;
