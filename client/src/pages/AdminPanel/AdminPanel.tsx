import { useState } from "react";
import "./AdminPanel.css";
import MembersPage from "../MembersPage/MembersPage";
import MessagesPage from "../MessagesPage/MessagesPage";
import SettingsPage from "../SettingsPage/SettingsPage";

function AdminPanel() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>JinLoup Panel ⛩️</h2>
        <nav>
          <ul>
            <li>
              <button
                type="button"
                className={activePage === "dashboard" ? "active" : ""}
                onClick={() => setActivePage("dashboard")}
              >
                Tableau de bord
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "members" ? "active" : ""}
                onClick={() => setActivePage("members")}
              >
                Membres
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "messages" ? "active" : ""}
                onClick={() => setActivePage("messages")}
              >
                Messages
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "settings" ? "active" : ""}
                onClick={() => setActivePage("settings")}
              >
                Paramètres
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Bienvenue, Alpha Loup 🐺</h1>
        </header>

        {activePage === "dashboard" && (
          <section className="admin-dashboard">
            <div className="card-dashboard">
              <h3>Membres</h3>
              <p>24 loups inscrits</p>
            </div>
            <div className="card-dashboard">
              <h3>Modérateurs</h3>
              <p>3 gardiens actifs</p>
            </div>
            <div className="card-dashboard">
              <h3>Messages</h3>
              <p>128 messages postés</p>
            </div>
          </section>
        )}

        {activePage === "members" && <MembersPage />}

        {activePage === "messages" && <MessagesPage />}

        {activePage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

export default AdminPanel;
