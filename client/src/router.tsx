// Importez les modules nécessaires depuis React et React Router
import { createBrowserRouter } from "react-router";

// Importer le composant principal de l'application et les différentes pages et catégories
import App from "./App";
import Career from "./categories/Career/Career";
import Presentations from "./categories/Presentations/Presentations";
import TheDen from "./categories/TheDen/TheDen";
import Events from "./categories/TheEvents/TheEvents";
import Helpers from "./categories/TheHelpers/TheHelpers";
import Trombinoscope from "./categories/Trombinoscope/Trombinoscope";
import YourCreations from "./categories/YourCreations/YourCreations";
import YourPassions from "./categories/YourPassions/YourPassions";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AuthorPage from "./pages/AuthorPage/AuthorPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import CopyrightPage from "./pages/CopyrightPage/CopyrightPage";
import Etiquette from "./pages/Etiquette/Etiquette";
import ForumPage from "./pages/ForumPage/ForumPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MembersPage from "./pages/MembersPage/MembersPage";
import ModerationPanel from "./pages/ModerationPanel/ModerationPanel";
import Page404 from "./pages/Page404/Page404";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import UserPanel from "./pages/UserPanel/UserPanel";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <GalleryPage />,
        path: "/gallery",
      },
      {
        element: <ContactPage />,
        path: "/contact",
      },
      {
        element: <AuthorPage />,
        path: "/author",
      },
      {
        element: <ForumPage />,
        path: "/forum",
      },
      {
        element: <Presentations />,
        path: "forum/category/1",
      },
      {
        element: <Trombinoscope />,
        path: "forum/category/2",
      },
      {
        element: <YourCreations />,
        path: "forum/category/3",
      },
      {
        element: <YourPassions />,
        path: "forum/category/4",
      },
      {
        element: <TheDen />,
        path: "forum/category/5",
      },
      {
        element: <Events />,
        path: "forum/category/6",
      },
      {
        element: <Helpers />,
        path: "forum/category/7",
      },
      {
        element: <Career />,
        path: "forum/category/8",
      },
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <RegistrationPage />,
        path: "/registration",
      },
      {
        element: <PrivacyPolicy />,
        path: "/privacy-policy",
      },
      {
        element: <TermsOfUse />,
        path: "/terms-of-use",
      },
      {
        element: <Etiquette />,
        path: "/etiquette",
      },
      {
        element: <CopyrightPage />,
        path: "/copyright",
      },
      {
        element: <Page404 />,
        path: "*",
      },
      {
        element: <AdminPanel />,
        path: "/admin",
      },
      {
        element: <ModerationPanel />,
        path: "/moderation",
      },
      {
        element: <UserPanel />,
        path: "/profile",
      },
      {
        element: <MembersPage />,
        path: "/members",
      },
    ],
  },
]);

export default router;
