import { useState } from "react";
import "./AdminPanel.css";
import MembersPage from "../MembersPage/MembersPage";
import MessagesPage from "../MessagesPage/MessagesPage";
import SettingsPage from "../SettingsPage/SettingsPage";

function AdminPanel() {
  const [activePage, setActivePage] = useState("members");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        aria-label="Navigation du panel d'administration"
      >
        <h2>Espace Administrateur ⛩️</h2>
        <nav aria-label="Sections du panel admin">
          <ul>
            <li>
              <button
                type="button"
                className={activePage === "members" ? "active" : ""}
                onClick={() => setActivePage("members")}
                aria-pressed={activePage === "members"}
              >
                Membres
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "messages" ? "active" : ""}
                onClick={() => setActivePage("messages")}
                aria-pressed={activePage === "messages"}
              >
                Messages
              </button>
            </li>
            <li>
              <button
                type="button"
                className={activePage === "profile" ? "active" : ""}
                onClick={() => setActivePage("profile")}
                aria-pressed={activePage === "profile"}
              >
                Profil
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

        {activePage === "members" && <MembersPage />}

        {activePage === "messages" && <MessagesPage />}

        {activePage === "profile" && <SettingsPage />}
      </main>
    </div>
  );
}

export default AdminPanel;
