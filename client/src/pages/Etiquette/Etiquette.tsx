import "./Etiquette.css";

function Etiquette() {
  return (
    <main className="etiquette-page">
      <h1>Étiquette du forum</h1>
      <div className="etiquette-content">
        <p className="last-updated">Dernière mise à jour : 16 janvier 2025</p>

        <section>
          <h2>1. Respect et Courtoisie</h2>
          <p>
            Le respect mutuel est la base de notre communauté. Traitez tous les
            membres avec courtoisie, même en cas de désaccord.
          </p>
          <ul>
            <li>Utilisez un langage poli et respectueux</li>
            <li>Évitez les insultes, attaques personnelles ou harcèlement</li>
            <li>Respectez les opinions et croyances des autres</li>
          </ul>
        </section>

        <section>
          <h2>2. Pertinence des Discussions</h2>
          <p>
            Restez dans le sujet de discussion. Les messages hors sujet peuvent
            être déplacés ou supprimés.
          </p>
          <ul>
            <li>Postez dans les catégories appropriées</li>
            <li>Utilisez des titres descriptifs pour vos sujets</li>
            <li>Évitez le spam et les messages répétitifs</li>
          </ul>
        </section>

        <section>
          <h2>3. Contenu Approprié</h2>
          <p>
            Le contenu partagé doit respecter les normes de décence et de
            légalité.
          </p>
          <ul>
            <li>Pas de contenu violent ou offensant</li>
            <li>
              Respectez les droits d'auteur et la propriété intellectuelle
            </li>
            <li>
              Évitez la promotion de produits ou services sans autorisation
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Vie Privée</h2>
          <p>Protégez votre vie privée et celle des autres.</p>
          <ul>
            <li>Ne partagez pas d'informations personnelles sensibles</li>
            <li>Respectez la confidentialité des échanges privés</li>
            <li>
              Ne demandez pas d'informations personnelles aux autres membres
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Modération</h2>
          <p>L'équipe de modération veille au respect de ces règles.</p>
          <ul>
            <li>Les modérateurs peuvent supprimer les messages inappropriés</li>
            <li>
              Les sanctions peuvent aller de l'avertissement au bannissement
            </li>
            <li>Vous pouvez signaler un abus"</li>
          </ul>
        </section>

        <section>
          <h2>6. Conseils Pratiques</h2>
          <p>Quelques conseils pour une meilleure expérience sur le forum.</p>
          <ul>
            <li>
              Corrigez vos fautes d'orthographe pour une meilleure lisibilité
            </li>
            <li>Soyez patient lorsqu'une réponse tardive</li>
            <li>Remerciez ceux qui vous aident</li>
          </ul>
        </section>

        <section>
          <h2>7. Rôles et Responsabilités</h2>
          <p>Différents rôles existent pour maintenir l'ordre du forum.</p>
          <ul>
            <li>
              <strong>Jeune Loup</strong> : Membre standard
            </li>
            <li>
              <strong>Loup Gardien</strong> : Modérateur, veille au respect des
              règles
            </li>
            <li>
              <strong>Loup Alpha</strong> : Administrateur, gère le forum
            </li>
          </ul>
        </section>

        <section>
          <h2>8. Contact et Assistance</h2>
          <p>Besoin d'aide ? N'hésitez pas à nous contacter.</p>
          <p>
            Pour toute question sur l'étiquette ou signalement d'abus, contactez
            un modérateur ou utilisez la page <a href="/contact">Contact</a>.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Etiquette;
