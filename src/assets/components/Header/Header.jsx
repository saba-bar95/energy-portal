import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sakstatLogo from "/src/assets/images/header/sakstat-logo.svg";
import sakstatText from "/src/assets/images/header/sakstat-text.svg";
import downVectorBlack from "/src/assets/images/header/down-vector-black.svg";
import upVectorBlack from "/src/assets/images/header/up-vector-black.svg";
import sections from "../../../../sections";
import { SectionsContext } from "../../../App";
import LanguageChanger from "../LanguageChanger/LanguageChanger";
import Socials from "../Socials/Socials";
import text from "./text";

const Header = () => {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const { setSectionID, selectedSection, setSelectedSection } =
    useContext(SectionsContext);

  const navigate = useNavigate();
  const { language } = useParams();

  const handleSectionOpen = () => {
    setIsSectionsOpen(!isSectionsOpen);
  };

  const handleSectionSelect = (sectionID) => {
    setSelectedSection(sectionID);
    setSectionID(sectionID);
    setIsSectionsOpen(false);
  };

  const handleHeaderClick = () => {
    setIsSectionsOpen(false);
    setSelectedSection(null);
    setSectionID(null);
    navigate(`/${language}`);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="right">
            <img src={sakstatLogo} alt="sakstat-logo" />
            <img src={sakstatText} alt="sakstat-text" className="text" />
          </div>
          <div className="left">
            <div className="texts">
              <h1 onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
                {text[language].header1}
              </h1>
              <h1
                className={`choose-section ${isSectionsOpen ? "bold" : ""}`}
                onClick={handleSectionOpen}>
                {text[language].header2}
                {!isSectionsOpen && <img src={downVectorBlack} alt="" />}
                {isSectionsOpen && <img src={upVectorBlack} alt="" />}
              </h1>
              {isSectionsOpen && (
                <div className="sections-container">
                  <ul>
                    {sections.map((section, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => handleSectionSelect(section.id)}>
                          <p
                            className={
                              selectedSection === section.id ? "selected" : ""
                            }>
                            {section[`name_${language}`]}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="socials">
              <Socials />
              <LanguageChanger />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
