import "./OnlineForum.css";

function OnlineForum() {
  return (
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
  );
}

export default OnlineForum;
