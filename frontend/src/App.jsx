import { useState } from "react";
import NavBar from "../components/NavBar";
import "./App.css";
import HomePage from "../components/HomePage";
import AddProductModalForm from "../components/AddProductModalForm";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

function App() {
  const [theme, setTheme] = useState("dracula");

  return (
    <>
      <div
        data-theme={theme}
        className="min-h-screen  bg-base-200 transition-colors duration-300"
      >
        <Toaster />

        <NavBar theme={theme} setTheme={setTheme} />
        <HomePage />
      </div>
      <Footer />
    </>
  );
}

export default App;
