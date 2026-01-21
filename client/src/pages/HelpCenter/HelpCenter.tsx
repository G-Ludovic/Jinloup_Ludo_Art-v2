import "./HelpCenter.css";

function HelpCenter() {
  return (
    <main className="help-center-page">
      <h1>Centre d'aide</h1>
      <div className="help-center-content">
        <p className="last-updated">Dernière mise à jour : 16 janvier 2025</p>

        <section className="faq-section">
          <h2>❓ Questions Fréquemment Posées (FAQ)</h2>

          <div className="faq-item">
            <h3>Comment créer un compte ?</h3>
            <p>
              Cliquez sur "S'inscrire" dans le menu principal. Remplissez le
              formulaire avec votre email et un mot de passe. Un email de
              confirmation vous sera envoyé.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment publier une création ?</h3>
            <p>
              Connectez-vous à votre compte, allez dans "Galerie" puis allez sur
              "Proposez vos créations". Ajoutez un titre et une image, puis
              validez.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment participer au forum ?</h3>
            <p>
              Choisissez une catégorie dans "Forum", lisez les règles
              d'étiquette, puis créez un sujet ou répondez aux discussions
              existantes.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment modifier mon profil ?</h3>
            <p>
              Allez dans "Mon profil" (icône utilisateur), puis cliquez sur
              "Modifier". Vous pouvez changer vos options.
            </p>
          </div>

          <div className="faq-item">
            <h3>J'ai oublié mon mot de passe</h3>
            <p>
              Sur la page de connexion, cliquez sur "Mot de passe oublié".
              Entrez votre email et suivez les instructions.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment signaler un abus ?</h3>
            <p>
              Utilisez le bouton "Contact" disponible pour les messages
              inappropriés. Nos modérateurs examineront le signalement
              rapidement.
            </p>
          </div>
        </section>

        <section className="guides-section">
          <h2>📖 Guides d'utilisation</h2>

          <div className="guide-item">
            <h3>Guide du débutant</h3>
            <p>Nouveau sur Jinloup Ludo Art ? Découvrez comment :</p>
            <ul>
              <li>Créer votre compte et personnaliser votre profil</li>
              <li>Naviguer dans les différentes sections du site</li>
              <li>Publier votre première création artistique</li>
              <li>Participer aux discussions du forum</li>
            </ul>
          </div>

          <div className="guide-item">
            <h3>Galerie d'art</h3>
            <p>La galerie est l'espace central pour partager vos œuvres :</p>
            <ul>
              <li>Formats acceptés : JPG, PNG, WebP (max 10 Mo)</li>
              <li>Titres limités à 18 caractères</li>
              <li>Description optionnelle pour plus de contexte</li>
              <li>Modification possible après publication</li>
            </ul>
          </div>

          <div className="guide-item">
            <h3>Rôles et permissions</h3>
            <p>Comprendre la hiérarchie du site :</p>
            <ul>
              <li>
                <strong>Jeune Loup</strong> : Membre standard, peut publier et
                commenter
              </li>
              <li>
                <strong>Loup Gardien</strong> : Modérateur, gère les contenus et
                utilisateurs
              </li>
              <li>
                <strong>Loup Alpha</strong> : Administrateur, accès complet au
                site
              </li>
            </ul>
          </div>
        </section>

        <section className="troubleshooting-section">
          <h2>🔧 Dépannage</h2>

          <div className="trouble-item">
            <h3>Problèmes de connexion</h3>
            <ul>
              <li>Vérifiez votre email et mot de passe</li>
              <li>Essayez de vous déconnecter/reconnecter</li>
              <li>Contactez-nous si le problème persiste</li>
            </ul>
          </div>

          <div className="trouble-item">
            <h3>Erreurs d'upload d'image</h3>
            <ul>
              <li>Vérifiez la taille du fichier (max 10 Mo)</li>
              <li>Formats acceptés : JPG, PNG, WebP</li>
              <li>Essayez avec une image plus petite</li>
            </ul>
          </div>

          <div className="trouble-item">
            <h3>Messages qui n'apparaissent pas</h3>
            <ul>
              <li>Actualisez la page</li>
              <li>Vérifiez que vous êtes connecté</li>
              <li>Le contenu peut être en modération</li>
            </ul>
          </div>
        </section>

        <section className="contact-support">
          <h2>💬 Contact et Support</h2>
          <p>
            Besoin d'aide supplémentaire ? Notre équipe est là pour vous aider.
          </p>

          <div className="support-options">
            <div className="support-item">
              <h3>Forum communautaire</h3>
              <p>
                Posez vos questions sur le forum dans la catégorie "Aide". La
                communauté et les modérateurs vous répondront.
              </p>
            </div>

            <div className="support-item">
              <h3>Contact direct</h3>
              <p>
                Pour des problèmes personnels ou techniques, utilisez le{" "}
                <a href="/contact">formulaire de contact</a>.
              </p>
            </div>

            <div className="support-item">
              <h3>Report de bug</h3>
              <p>
                Trouvé un bug ? Signalez-le via GitHub ou le formulaire de
                contact.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HelpCenter;
