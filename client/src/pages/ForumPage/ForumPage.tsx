import "./ForumPage.css";

function ForumPage() {
  return (
    <>
      <h1>Forum</h1>
      <main className="forum-main">
        <article className="subject-forum">
          <h3>Les sujets</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Sujet</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Ici le sujet</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Ici le sujet</td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="latest-posts-forum">
          <h3>Derniers messages</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Message</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Ici le message</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Ici le message</td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="home-forum">
          <h3>Bienvenue sur le forum de Jinloup Ludo Art !</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Catégorie</th>
                <th scope="col">Messages</th>
                <th scope="col">Voir</th>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <th scope="row">Présentations</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">Trombinoscope</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">Vos créations</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">Vos passions</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">La Tanière</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">Évènements</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">Aides entre nous</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
              <tr>
                <th scope="row">Une carrière ?</th>
                <td>Ici le message</td>
                <td>
                  <button type="button">Ici</button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="onligne-forum">
          <h3>Qui est en ligne ?</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Indicateur</th>
                <th scope="col">Grades</th>
                <th scope="col">En ligne</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">logo 1</th>
                <td>Admin</td>
                <td>: Nb</td>
              </tr>
              <tr>
                <th scope="row">logo 2</th>
                <td>Modérateur</td>
                <td>: Nb</td>
              </tr>
              <tr>
                <th scope="row">logo 3</th>
                <td>Grand Loup</td>
                <td>: Nb</td>
              </tr>
              <tr>
                <th scope="row">logo 4</th>
                <td>Loup</td>
                <td>: Nb</td>
              </tr>
              <tr>
                <th scope="row">logo 5</th>
                <td>Louveteau</td>
                <td>: Nb</td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="regulation-forum">
          <h3>Règlement</h3>
          <h4>🤝 Respect et bienveillance</h4>
          <p>
            Sois poli avec tous les membres. Aucun propos insultant,
            discriminatoire ou haineux ne sera toléré. Les critiques doivent
            être constructives et respectueuses.
          </p>
          <h4>✏️ Publications et contenu</h4>
          <p>
            Poste tes œuvres dans les bonnes sections. Pas de plagiat : partage
            uniquement tes créations ou précise clairement si tu collabores. Pas
            de contenu choquant, NSFW ou inapproprié. Seulement si une
            cathégorie le précise pour le moins de 18 ans.
          </p>
          <h4>🧼 Propreté et clarté</h4>
          <p>
            Utilise des titres clairs pour tes sujets. Évite le flood (messages
            répétés ou inutiles). Essaie de faire attention à ton orthographe,
            pour être bien compris de tous.
          </p>
          <h4>🛡️ Modération</h4>
          <p>
            Les modérateurs sont là pour aider et garder une bonne ambiance.
            Merci de respecter leurs décisions. En cas de souci, contacte un
            modérateur en message privé.
          </p>
        </article>
      </main>
    </>
  );
}

export default ForumPage;
