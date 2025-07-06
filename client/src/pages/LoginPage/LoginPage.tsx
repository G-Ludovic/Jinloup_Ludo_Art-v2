import { Link } from "react-router";
import "./LoginPage.css";
import { toast } from "react-toastify";

function LoginPage() {
  const handleSubmit = (FormData: FormData) => {
    const data = Object.fromEntries(FormData);

    fetch("http://localhost:3310/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        toast.success("🎉 Félicitations, vous êtes connecté !");
      } else {
        toast.error("😩 Connection échouée");
      }
    });
  };

  return (
    <>
      <h1>Veuillez vous connecter</h1>
      <main className="login-page">
        <form action={handleSubmit}>
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ex: loup@gmail.com"
          />

          <label htmlFor="password">Votre mot de passe</label>
          <input type="password" name="password" placeholder="************" />

          <button type="submit">Valider</button>
        </form>

        <p>
          Vous n'avez pas de compte ?{" "}
          <Link to="/registration">Créez-en un !</Link>
        </p>
      </main>
    </>
  );
}

export default LoginPage;
