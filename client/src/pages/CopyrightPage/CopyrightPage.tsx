import "./CopyrightPage.css";

export default function CopyrightPage() {
  return (
    <main className="copyright-page">
      <h1>Droits d’auteur & Mentions légales</h1>
      <div className="copyright-content">
        <p className="update-date">Dernière mise à jour : Novembre 2025</p>

        <section>
          <h2>1. Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus présents sur le site{" "}
            <strong>Jinloup Ludo Art</strong> — textes, images, illustrations,
            logos, éléments graphiques et code source — est protégé par le droit
            d’auteur et les conventions internationales sur la propriété
            intellectuelle.
          </p>
          <p>
            Sauf mention contraire, ces contenus sont la propriété exclusive de{" "}
            <strong>Jinloup</strong> ou de leurs auteurs respectifs, ayant donné
            leur accord explicite pour la publication.
          </p>
        </section>

        <section>
          <h2>2. Utilisation des créations des membres</h2>
          <p>
            Chaque utilisateur conserve l’entière propriété intellectuelle de
            ses œuvres publiées sur la plateforme. En publiant sur{" "}
            <strong>Jinloup Ludo Art</strong>, il accorde toutefois une licence
            non exclusive à la plateforme pour afficher, diffuser et promouvoir
            sa création dans le cadre du site et de ses services.
          </p>
          <p>
            Aucune reproduction, modification ou redistribution des créations ne
            peut être faite sans l’accord préalable de l’auteur concerné.
          </p>
        </section>

        <section>
          <h2>3. Respect du droit moral</h2>
          <p>
            Conformément à l’article L121-1 du Code de la propriété
            intellectuelle, toute œuvre publiée sur ce site doit toujours être
            accompagnée du nom ou pseudonyme de son auteur, et ne peut être
            altérée ou utilisée d’une manière portant atteinte à son intégrité.
          </p>
        </section>

        <section>
          <h2>4. Signalement d’un contenu</h2>
          <p>
            Si vous estimez qu’un contenu publié sur{" "}
            <strong>Jinloup Ludo Art</strong> enfreint vos droits d’auteur, vous
            pouvez envoyer une demande de retrait à :{" "}
            <a href="mailto:l.galicher@orange.fr">l.galicher@orange.fr</a>
          </p>
          <p>
            Votre message devra contenir :
            <ul>
              <li>Une description précise du contenu concerné.</li>
              <li>La preuve de votre droit sur l’œuvre.</li>
              <li>Votre identité complète et vos coordonnées.</li>
            </ul>
          </p>
        </section>

        <section>
          <h2>5. Reproduction du contenu du site</h2>
          <p>
            Toute reproduction partielle ou totale du site ou de ses éléments
            sans autorisation expresse est interdite et constituerait une
            contrefaçon sanctionnée par les articles L335-2 et suivants du Code
            de la propriété intellectuelle.
          </p>
        </section>

        <section>
          <h2>6. Crédits</h2>
          <ul>
            <li>
              Développement du site : <strong>Ludovic GALICHER</strong>
            </li>
            <li>
              Illustrations : auteurs inscrits sur la plateforme ou banques
              d’images libres de droits (Pixabay, Unsplash...).
            </li>
            <li>Technologies : React, TypeScript, Node.js, Express, MySQL.</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Pour toute question ou demande, vous pouvez écrire à :{" "}
            <a href="mailto:l.galicher@orange.fr">l.galicher@orange.fr</a>
          </p>
        </section>
      </div>
    </main>
  );
}
