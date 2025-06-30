import "./RegistrationPage.css";

function RegistrationPage() {
  return (
    <>
      <h1>Enregistrement</h1>
      <main className="registration-page">
        <form>
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ex: loup@gmail.com"
          />

          <label htmlFor="password">Votre mot de passe</label>
          <input type="password" name="password" placeholder="************" />

          <label htmlFor="confirm-password">Confirmez votre mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="************"
          />

          <button type="submit">Valider</button>
        </form>
      </main>
    </>
  );
}

export default RegistrationPage;
