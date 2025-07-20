// Import necessary modules from React and React Router
import { createBrowserRouter } from "react-router";

// Import the main app component
import App from "./App";
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
