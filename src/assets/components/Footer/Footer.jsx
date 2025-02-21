import text from "../../../../text";
import { useParams } from "react-router-dom";
import Socials from "../Socials/Socials";
import sections from "../../../../sections";
import { useContext } from "react";
import { SectionsContext } from "../../../App";

const Footer = () => {
  const { language } = useParams();

  const { setSectionID, setSelectedSection } = useContext(SectionsContext);

  const texts = text[language].footer;

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

  return (
    <footer>
      <div className="footer-container">
        <div className="container">
          <h1>{texts.header1}</h1>
          <div className="paras">
            <p>{texts.para11}</p>
            <a href="tel:+995322367210">
              <p>{texts.para12}</p>
            </a>
            <a href={`mailto:${texts.para13}`}>
              <p>{texts.para13}</p>{" "}
            </a>
            <p>{texts.para14}</p>
          </div>
          <div className="socials">
            <h1>{texts.para15}</h1>
            <Socials />
          </div>
        </div>
        <div className="container">
          <h1>{texts.header2}</h1>
          <div className="sections-container">
            <ul>
              {sections.map((section, i) => {
                return (
                  <li key={i} onClick={() => handleSectionSelect(section.id)}>
                    <p>{section[`name_${language}`]}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="container">
          <h1 onClick={openTermsOfDataUse} className="terms">
            {texts.header3}
          </h1>
        </div>
      </div>
      <div className="border-container"></div>
      <div className="rights">
        <h1>{texts.header4}</h1>
      </div>
    </footer>
  );
};

export default Footer;
