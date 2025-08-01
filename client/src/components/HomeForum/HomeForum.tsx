import "./HomeForum.css";

function HomeForum() {
  return (
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
  );
}

export default HomeForum;
