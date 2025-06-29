import "./Page404.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Page404() {
  const [seconds, setSeconds] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newSeconds = seconds - 1;
      setSeconds(newSeconds);

      if (newSeconds <= 0) {
        clearInterval(interval);
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, navigate]);

  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <>
      <h1>Erreur 404</h1>
      <main className="page404">
        <figure>
          <img src="/public/images/wolf_404.webp" alt="loup surpris" />
          <figcaption id="sr-only">
            "Représentation de la page d'erreur 404 illustrée par un avatar de
            loup surpris."
          </figcaption>
        </figure>
        <article>
          <p>La page que vous recherchez ne semble pas disponible.</p>
          <p id="chrono">
            Vous allez être rediriger dans {displaySeconds} secondes <br />
            vers la page d'accueil.
          </p>
        </article>
      </main>
    </>
  );
}

export default Page404;
