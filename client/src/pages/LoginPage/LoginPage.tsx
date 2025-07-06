import { Link } from "react-router";
import "./LoginPage.css";

function LoginPage() {
  const handleSubmit = (FormData: FormData) => {
    const data = Object.fromEntries(FormData);

    if (data.password !== data.confirmPassword) {
      // console.log("Les mots de passes ne concordent pas !");
      return;
    }

    fetch("http://localhost:3310/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => console.warn("Ma réponse : ", res.ok));
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
