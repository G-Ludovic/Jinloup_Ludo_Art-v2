import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
