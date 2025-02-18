import text from "../../../../text";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import sakstatLogo from "/src/assets/images/header/sakstat-logo.svg";
import sakstatText from "/src/assets/images/header/sakstat-text.svg";
import facebook from "/src/assets/images/header/facebook-icon.svg";
import linkedin from "/src/assets/images/header/linkedin-icon.svg";
import x from "/src/assets/images/header/x-icon.svg";
import georgianFlag from "/src/assets/images/header/georgian-flag.svg";
import britishFlag from "/src/assets/images/header/british-flag.svg";
import downVectorBlack from "/src/assets/images/header/down-vector-black.svg";
import upVectorBlack from "/src/assets/images/header/up-vector-black.svg";
import upVectorGray from "/src/assets/images/header/up-vector-gray.svg";
import downVectorGray from "/src/assets/images/header/down-vector-gray.svg";
import sections from "../../../../sections";
import { SectionsContext } from "../../../App";

const Header = () => {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(null);
  const { setSectionID } = useContext(SectionsContext);
  const navigate = useNavigate();

  const handleSectionOpen = () => {
    setIsSectionsOpen(!isSectionsOpen);
  };

  const handleSectionSelect = (sectionID) => {
    setSelectedSection(sectionID);
    setSectionID(sectionID);
  };

  const handleHeaderClick = () => {
    navigate("/ka");
  };

  const handleLanguageChange = () => {};

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
                {text.ka.header.header1}
              </h1>
              <h1
                className={`choose-section ${isSectionsOpen ? "bold" : ""}`}
                onClick={handleSectionOpen}>
                {text.ka.header.header2}
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
                            {section.name}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="socials">
              <img src={facebook} alt="facebook-icon" />
              <img src={x} alt="x-icon" />
              <img src={linkedin} alt="linkedin-icon" />
              <button>
                <img src={georgianFlag} alt="georgian-flag" />
                {text.ka.header.ka}
                <img src={downVectorGray} alt="down-vector" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
