import Header from "./assets/components/Header/Header";
import { createContext, useState } from "react";
import Section from "./assets/components/Section/Section";
import Footer from "./assets/components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import sections from "../sections";

export const SectionsContext = createContext(null);

function App() {
  const location = useLocation();
  const sectionName = location.pathname.split("/")[2];

  const initialSectionID =
    sections.find((el) => el.href === sectionName)?.id || null;

  const [sectionID, setSectionID] = useState(initialSectionID);

  return (
    <>
      <SectionsContext.Provider
        value={{
          sectionID,
          setSectionID,
        }}>
        <Header />
        <main>
          <Section />
          <Outlet />
        </main>
        <Footer />
      </SectionsContext.Provider>
    </>
  );
}

export default App;
