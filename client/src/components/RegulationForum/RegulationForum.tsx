import "./RegulationForum.css";

function RegulationForum() {
  return (
    <main className="regulation-page">
      <h2>Règlement</h2>
      <aside className="regulation-forum">
        <h3>🤝 Respect et bienveillance</h3>
        <p>
          Sois poli avec tous les membres. Aucun propos insultant,
          discriminatoire ou haineux ne sera toléré. Les critiques doivent être
          constructives et respectueuses.
        </p>
        <h3>✏️ Publications et contenu</h3>
        <p>
          Poste tes œuvres dans les bonnes sections. Pas de plagiat : partage
          uniquement tes créations ou précise clairement si tu collabores. Pas
          de contenu choquant, NSFW ou inapproprié. Seulement si une cathégorie
          le précise pour les moins de 18 ans.
        </p>
        <h3>🧼 Propreté et clarté</h3>
        <p>
          Utilise des titres clairs pour tes sujets. Évite le flood (messages
          répétés ou inutiles). Essaie de faire attention à ton orthographe,
          pour être bien compris de tous.
        </p>
        <h3>🛡️ Modération</h3>
        <p>
          Les modérateurs sont là pour aider et garder une bonne ambiance. Merci
          de respecter leurs décisions. En cas de souci, contacte un modérateur
          en message privé.
        </p>
      </aside>
    </main>
  );
}

export default RegulationForum;
