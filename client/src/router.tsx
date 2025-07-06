// Import necessary modules from React and React Router
import { createBrowserRouter } from "react-router";

// Import the main app component
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import AuthorPage from "./pages/AuthorPage/AuthorPage";
import Page404 from "./pages/Page404/Page404";
import LoginPage from "./pages/LoginPage/LoginPage";
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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
