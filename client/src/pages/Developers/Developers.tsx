import "./Developers.css";

function Developers() {
  return (
    <main className="developers-page">
      <h1>Équipe de Développement</h1>
      <div className="developers-content">
        <p className="last-updated">Dernière mise à jour : 16 janvier 2025</p>

        <section className="developer-profile">
          <div className="developer-header">
            <img
              src="/images/loup_manuscrit.webp"
              alt="Ludovic Galicher - Développeur principal"
              className="developer-avatar"
            />
            <div>
              <h2>Ludovic Galicher</h2>
              <p className="developer-role">Développeur Full-Stack & Artiste</p>
              <p className="developer-title">Créateur de Jinloup Ludo Art</p>
            </div>
          </div>

          <div className="developer-bio">
            <h3>À propos</h3>
            <p>
              Passionné par le développement web et l'art numérique depuis plus
              de 10 ans. Ludovic combine ses compétences techniques avec sa
              créativité artistique pour créer des expériences uniques en ligne.
              Il est le fondateur et développeur principal de Jinloup Ludo Art.
            </p>

            <h3>Compétences Techniques</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Frontend</h4>
                <ul>
                  <li>React / TypeScript</li>
                  <li>HTML5 / CSS3</li>
                  <li>Vite / Webpack</li>
                  <li>Responsive Design</li>
                </ul>
              </div>

              <div className="skill-category">
                <h4>Backend</h4>
                <ul>
                  <li>Node.js / Express</li>
                  <li>MySQL</li>
                  <li>API REST</li>
                  <li>Authentification JWT</li>
                </ul>
              </div>

              <div className="skill-category">
                <h4>Outils & Méthodes</h4>
                <ul>
                  <li>Git / GitHub</li>
                  <li>Docker / CI/CD</li>
                  <li>Biome / ESLint</li>
                  <li>Agile / Scrum</li>
                </ul>
              </div>

              <div className="skill-category">
                <h4>Créatif</h4>
                <ul>
                  <li>Gimp / Krita</li>
                  <li>Animation 2D</li>
                  <li>3D avec Render</li>
                  <li>Design UI/UX</li>
                </ul>
              </div>
            </div>

            <h3>Contact</h3>
            <div className="contact-links">
              <a
                href="https://github.com/G-Ludovic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/github-mark.svg" alt="GitHub" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ludovic-galicher-69ba9932a"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/linkedin.webp" alt="LinkedIn" />
                LinkedIn
              </a>
              <a href="/contact">📧 Contact</a>
            </div>
          </div>
        </section>

        <section className="project-info">
          <h3>À propos du Projet</h3>
          <p>
            Jinloup Ludo Art est un projet personnel développé avec passion. Il
            combine art numérique, développement web moderne et communauté
            artistique. Le site est construit avec React en frontend et Node.js
            en backend, déployé sur Vercel et Render.
          </p>

          <h3>Technologies Utilisées</h3>
          <div className="tech-stack">
            <span className="tech-badge">React 18</span>
            <span className="tech-badge">TypeScript</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">MySQL</span>
            <span className="tech-badge">Vite</span>
            <span className="tech-badge">Biome</span>
            <span className="tech-badge">Docker</span>
          </div>
        </section>

        <section className="contribute">
          <h3>Contribuer</h3>
          <p>
            Intéressé par le projet ? Vous pouvez contribuer de plusieurs façons
            :
          </p>
          <ul>
            <li>Signaler des bugs ou suggérer des améliorations</li>
            <li>Proposer des idées de fonctionnalités</li>
            <li>Partager vos créations artistiques</li>
            <li>Participer aux discussions sur le forum</li>
          </ul>

          <p>
            Pour les contributions techniques, le code source est disponible sur{" "}
            <a
              href="https://github.com/G-Ludovic/Jinloup_Ludo_Art-v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

export default Developers;
