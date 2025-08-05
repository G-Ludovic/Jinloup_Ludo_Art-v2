import { useEffect } from "react";
import Career from "../../categories/Career/Career";
import Events from "../../categories/Events/Events";
import Helpers from "../../categories/Helpers/Helpers";
import Presentations from "../../categories/Presentations/Presentations";
import TheDen from "../../categories/TheDen/TheDen";
import Trombinoscope from "../../categories/Trombinoscope/Trombinoscope";
import YourCreations from "../../categories/YourCreations/YourCreations";
import YourPassions from "../../categories/YourPassions/YourPassions";
import HomeForum from "../../components/HomeForum/HomeForum";
import LatestsPostsForum from "../../components/LatestsPostsForum/LatestsPostsForum";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import RegulationForum from "../../components/RegulationForum/RegulationForum";
import SubjectForum from "../../components/SubjectForum/SubjectForum";
import "./ForumPage.css";

type Categorie = {
  id: string;
  name: string;
  message: string;
};

function ForumPage() {
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3310/api/categories");
      const data = await response.json();
      console.log("Fetched categories:", data);
    };

    fetchCategories();
  }, []);

  const renderCategoryComponent = (cat: Categorie) => {
    switch (cat.name.toLowerCase()) {
      case "1":
        return <Presentations />;
      case "2":
        return <Trombinoscope />;
      case "3":
        return <YourCreations />;
      case "4":
        return <YourPassions />;
      case "5":
        return <TheDen />;
      case "6":
        return <Events />;
      case "7":
        return <Helpers />;
      case "8":
        return <Career />;
      default:
        return renderCategoryComponent;
    }
  };

  return (
    <div>
      <h1>Forum</h1>
      <main className="forum-main">
        <SubjectForum />
        <LatestsPostsForum />
        <HomeForum />
        <OnlineForum />
        <RegulationForum />
      </main>
    </div>
  );
}

export default ForumPage;
