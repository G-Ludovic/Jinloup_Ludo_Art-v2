import { useState } from "react";
import SettingsPage from "../SettingsPage/SettingsPage";
import "./UserPanel.css";

function UserPanel() {
  const [activePage, setActivePage] = useState("profile");

  return (
    <div className="user-container">
      {/* Sidebar */}
      <aside className="user-sidebar">
        <h2>Espace Membres 🌙</h2>
        <nav>
          <ul>
            <li>
              <button
                type="button"
                className={activePage === "profile" ? "active" : ""}
                onClick={() => setActivePage("profile")}
              >
                Profil
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "stats" ? "active" : ""}
                onClick={() => setActivePage("stats")}
              >
                Statistiques
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="user-main">
        <header className="user-header">
          <h1>Mon Espace Personnel 🐺</h1>
        </header>

        {activePage === "profile" && <SettingsPage />}

        {activePage === "stats" && (
          <section className="user-stats">
            <h3>Mes statistiques de messages</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Aujourd'hui</h4>
                <p className="stat-number">2</p>
              </div>
              <div className="stat-card">
                <h4>Cette semaine</h4>
                <p className="stat-number">8</p>
              </div>
              <div className="stat-card">
                <h4>Ce mois</h4>
                <p className="stat-number">12</p>
              </div>
              <div className="stat-card">
                <h4>Total</h4>
                <p className="stat-number">45</p>
              </div>
            </div>
            <div className="activity-chart">
              <h4>Activité récente</h4>
              <div className="chart-placeholder">
                <p>📊 Graphique d'activité à venir</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default UserPanel;
