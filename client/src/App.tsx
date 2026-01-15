import "./global.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      </main>
      <Footer />
    </>
  );
}

export default App;
