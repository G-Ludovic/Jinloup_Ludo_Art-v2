import { useCallback, useEffect, useState } from "react";
import { loadOnlineStats } from "../../api";
import "./OnlineForum.css";

type Grade = {
  id: string;
  name: string;
  online: number;
  total: number;
};

const roleMapping: Record<string, string> = {
  "loup alpha": "Admin",
  "loup gardien": "Modérateur",
  "jeune loup": "Membre",
};

function OnlineForum() {
  const [grades, setGrades] = useState<Grade[]>([]);

  const fetchStats = useCallback(async () => {
    const stats = await loadOnlineStats();
    if (stats?.stats) {
      const dynamicGrades = stats.stats.map(
        (
          stat: { role: string; total: number; online: number },
          index: number,
        ) => ({
          id: `g${index + 1}`,
          name: roleMapping[stat.role] || stat.role,
          online: stat.online,
          total: stat.total,
        }),
      );
      setGrades(dynamicGrades);
    } else {
      setGrades([]);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Mettre à jour les stats toutes les 10 secondes
    const interval = setInterval(fetchStats, 10000);

    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <main className="online-page">
      <h2>Qui est en ligne ?</h2>
      <aside className="online-forum">
        <table>
          <thead>
            <tr>
              <th scope="col">Indicateur</th>
              <th scope="col">Grades</th>
              <th scope="col">En ligne / Total</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((gra) => (
              <tr key={gra.id}>
                <th scope="row">{gra.name}</th>
                <td>{gra.name}</td>
                <td>
                  : {gra.online} / {gra.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>
    </main>
  );
}

export default OnlineForum;
