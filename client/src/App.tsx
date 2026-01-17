import "./global.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { ThemeProvider } from "./services/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <ThemeToggle />

      <main>
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
