import { useState } from "react";
import "./ModerationPanel.css";
import MembersPage from "../MembersPage/MembersPage";
import MessagesPage from "../MessagesPage/MessagesPage";
import SettingsPage from "../SettingsPage/SettingsPage";

function ModerationPanel() {
  const [activePage, setActivePage] = useState("members");

  return (
    <div className="moderation-container">
      {/* Sidebar */}
      <aside className="moderation-sidebar">
        <h2>JinLoup Modération 🛡️</h2>
        <nav>
          <ul>
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
                Profil
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="moderation-main">
        <header className="moderation-header">
          <h1>Bienvenue, Gardien Loup 🐺</h1>
        </header>

        {activePage === "members" && <MembersPage />}

        {activePage === "messages" && <MessagesPage />}

        {activePage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

export default ModerationPanel;
