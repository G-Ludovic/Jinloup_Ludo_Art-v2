import HomeForum from "../../components/HomeForum/HomeForum";
import LatestsPostsForum from "../../components/LatestsPostsForum/LatestsPostsForum";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import RegulationForum from "../../components/RegulationForum/RegulationForum";
import SubjectForum from "../../components/SubjectForum/SubjectForum";
import "./ForumPage.css";

function ForumPage() {
  return (
    <>
      <h1>Forum</h1>
      <main className="forum-main">
        <SubjectForum />
        <LatestsPostsForum />
        <HomeForum />
        <OnlineForum />
        <RegulationForum />
      </main>
    </>
  );
}

export default ForumPage;
