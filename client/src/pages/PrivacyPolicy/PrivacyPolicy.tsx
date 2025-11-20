import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <h1>Politique de confidentialité</h1>
      <div className="privacy-page">
        <p className="update-date">Dernière mise à jour : Novembre 2025</p>

        <section className="article-policy">
          <h2>1. Introduction</h2>
          <p>
            Chez <strong>Jinloup Ludo Art</strong>, nous accordons une grande
            importance à la confidentialité et à la sécurité de vos données
            personnelles. Cette politique explique quelles informations sont
            collectées, dans quel but, et comment elles sont protégées lorsque
            vous utilisez notre plateforme.
          </p>
        </section>

        <section className="article-policy">
          <h2>2. Données collectées</h2>
          <p>
            Nous collectons uniquement les informations nécessaires au bon
            fonctionnement du site :
          </p>
          <ul>
            <li>
              Informations de compte : pseudo, email, mot de passe (haché).
            </li>
            <li>
              Contenus partagés : créations, commentaires et messages envoyés.
            </li>
            <li>
              Données techniques : adresse IP, navigateur, cookies de session
              (utilisés uniquement pour la connexion).
            </li>
          </ul>
        </section>

        <section className="article-policy">
          <h2>3. Finalités du traitement</h2>
          <ul>
            <li>Création et gestion du compte utilisateur.</li>
            <li>Publication et affichage des créations artistiques.</li>
            <li>Sécurisation de l’accès via authentification JWT.</li>
            <li>Amélioration continue du site et de ses fonctionnalités.</li>
          </ul>
        </section>

        <section className="article-policy">
          <h2>4. Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li>Votre consentement (lors de la création d’un compte).</li>
            <li>
              L’exécution d’un contrat (accès et gestion du compte utilisateur).
            </li>
            <li>L’intérêt légitime du site (sécurisation et maintenance).</li>
          </ul>
        </section>

        <section className="article-policy">
          <h2>5. Durée de conservation</h2>
          <p>
            Vos données personnelles sont conservées aussi longtemps que votre
            compte est actif. Vous pouvez à tout moment demander leur
            suppression. Les journaux techniques sont conservés 30 jours à des
            fins de sécurité et de maintenance.
          </p>
        </section>

        <section className="article-policy">
          <h2>6. Partage des données</h2>
          <p>
            Vos données ne sont <strong>jamais vendues</strong> à des tiers.
            Elles peuvent être partagées uniquement :
          </p>
          <ul>
            <li>
              Avec nos prestataires techniques (hébergeur, outils de
              messagerie).
            </li>
            <li>En cas d’obligation légale (ex : réquisition judiciaire).</li>
          </ul>
        </section>

        <section className="article-policy">
          <h2>7. Sécurité des données</h2>
          <ul>
            <li>
              Hachage des mots de passe avec l’algorithme{" "}
              <strong>Argon2</strong>.
            </li>
            <li>
              Authentification sécurisée via <strong>JWT</strong>.
            </li>
            <li>Serveur protégé par HTTPS et pare-feu.</li>
            <li>Accès à la base de données restreint aux administrateurs.</li>
          </ul>
        </section>

        <section className="article-policy">
          <h2>8. Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez de :
          </p>
          <ul>
            <li>
              Droit d’accès, de rectification et de suppression de vos données.
            </li>
            <li>Droit de limitation ou d’opposition au traitement.</li>
            <li>Droit à la portabilité de vos informations.</li>
            <li>
              Droit d’introduire une réclamation auprès de la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
                www.cnil.fr
              </a>
            </li>
          </ul>
        </section>

        <section className="article-policy">
          <h2>9. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est : <br />
            <strong>Ludovic GALICHER</strong> <br />
            Email :{" "}
            <a href="mailto:l.galicher@orange.fr">l.galicher@orange.fr</a>{" "}
            <br />
            Hébergeur : OVH / Render / Vercel (en attente de déploiement final)
          </p>
        </section>

        <section className="article-policy">
          <h2>10. Modifications de la politique</h2>
          <p>
            Cette politique peut être modifiée à tout moment pour s’adapter aux
            évolutions légales ou techniques. La date de la dernière mise à jour
            est toujours indiquée en haut de la page.
          </p>
        </section>
      </div>
    </main>
  );
}
