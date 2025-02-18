import Header from "./assets/components/Header/Header";
import { createContext, useState } from "react";
import Section from "./assets/components/Section/Section";
import Footer from "./assets/components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const SectionsContext = createContext(null);

function App() {
  const [sectionID, setSectionID] = useState(null);

  return (
    <>
      <SectionsContext.Provider value={{ sectionID, setSectionID }}>
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
