// Import necessary modules from React and React Router
import { createBrowserRouter } from "react-router";

// Import the main app component
import App from "./App";
import Career from "./categories/Career/Career";
import Events from "./categories/Events/Events";
import Helpers from "./categories/Helpers/Helpers";
import Presentations from "./categories/Presentations/Presentations";
import TheDen from "./categories/TheDen/TheDen";
import Trombinoscope from "./categories/Trombinoscope/Trombinoscope";
import YourCreations from "./categories/YourCreations/YourCreations";
import YourPassions from "./categories/YourPassions/YourPassions";
import AuthorPage from "./pages/AuthorPage/AuthorPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Page404 from "./pages/Page404/Page404";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

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
        element: <Page404 />,
        path: "*",
      },
    ],
  },
]);

export default router;
