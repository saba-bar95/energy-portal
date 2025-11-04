import Header from "./assets/components/Header/Header";
import Footer from "./assets/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
