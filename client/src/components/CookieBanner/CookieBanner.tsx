import { useEffect, useState } from "react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <article className="cookie-banner">
      <p>
        Ce site utilise des cookies techniques pour améliorer votre expérience
        et assurer son bon fonctionnement. Aucune donnée n’est utilisée à des
        fins publicitaires.
      </p>
      <figure className="cookie-buttons">
        <button type="button" className="accept" onClick={handleAccept}>
          Accepter
        </button>
        <button type="button" className="reject" onClick={handleReject}>
          Refuser
        </button>
      </figure>
    </article>
  );
}
