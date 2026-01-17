import { Link, useNavigate } from "react-router";
import "./LoginPage.css";
import { toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";

function LoginPage() {
  const { setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (FormData: FormData) => {
    const data = Object.fromEntries(FormData);

    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        toast.success("Félicitations, vous êtes connecté !");
        setIsLogged(true);

        // On récupère l'utilisateur complet pour le rôle
        const refreshRes = await fetch("/api/refresh", {
          credentials: "include",
        });
        if (refreshRes.ok) {
          const userData = await refreshRes.json();
          setUser(userData);

          // Si l'utilisateur est admin, on redirige vers le Panel Admin
          if (userData.role === "loup alpha") {
            navigate("/admin");
          } else {
            navigate("/"); // Sinon accueil
          }
        }
      } else {
        toast.error("Connexion échouée");
        setIsLogged(false);
      }
    });
  };

  return (
    <>
      <h1>Veuillez vous connecter</h1>
      <main className="login-page">
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="loup@gmail.com"
            required
          />

          <label htmlFor="password">Votre mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="************"
            required
          />

          <button type="submit">Valider</button>

          <p>
            Vous n'avez pas de compte ?{" "}
            <Link to="/registration">Créez-en un !</Link>
          </p>
        </form>

        <div className="illustration-login">
          <img
            src="/images/loup_porte_sanctuaire.webp"
            alt="Illustration d'un loup devant une porte sanctuaire"
          />
        </div>
      </main>
    </>
  );
}

export default LoginPage;
