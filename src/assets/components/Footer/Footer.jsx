import { useParams } from "react-router-dom";
import Socials from "../Socials/Socials";
import sections from "../../../../sections";
import { useContext } from "react";
import { SectionsContext } from "../../../App";
import text from "./text";

const Footer = () => {
  const { language } = useParams();

  const { setSectionID, setSelectedSection } = useContext(SectionsContext);

  const handleSectionSelect = (sectionID) => {
    setSelectedSection(sectionID);
    setSectionID(sectionID);
  };

  const openTermsOfDataUse = () => {
    window.open(
      `https://www.geostat.ge/${language}/page/monacemta-gamoyenebis-pirobebi`,
      "_blank"
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      easing: "ease-in-out",
    });
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="container">
          <h1>{text[language].header1}</h1>
          <div className="paras">
            <p>{text[language].para11}</p>
            <a href="tel:+995322367210">
              <p>{text[language].para12}</p>
            </a>
            <a href={`mailto:${text[language].para13}`}>
              <p>{text[language].para13}</p>{" "}
            </a>
            <p>{text[language].para14}</p>
          </div>
          <div className="socials">
            <h1>{text[language].para15}</h1>
            <Socials />
          </div>
        </div>
        <div className="container">
          <h1>{text[language].header2}</h1>
          <div className="sections-container">
            <ul>
              {sections.map((section, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      scrollToTop();
                      handleSectionSelect(section.id);
                    }}>
                    <p>{section[`name_${language}`]}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="container">
          <h1 onClick={openTermsOfDataUse} className="terms">
            {text[language].header3}
          </h1>
        </div>
      </div>
      <div className="border-container"></div>
      <div className="rights">
        <h1>{text[language].header4}</h1>
      </div>
    </footer>
  );
};

export default Footer;
