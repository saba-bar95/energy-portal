import { useState, useRef, useEffect } from "react"; // UPDATED: Added useRef and useEffect
import { useParams } from "react-router-dom";
import sakstatLogo from "/src/assets/images/header/sakstat-logo.svg";
import sakstatLogoEn from "/src/assets/images/header/sakstat-logo-en.png";
import downVectorBlack from "/src/assets/images/header/down-vector-black.svg";
import upVectorBlack from "/src/assets/images/header/up-vector-black.svg";
import sections from "../../../../sections";
import Socials from "../Socials/Socials";
import text from "./text";
import { Link } from "react-router-dom";
import LanguageChanger from "../LanguageChanger/LanguageChanger";
import Svg from "./Svg";

const Header = () => {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const { language } = useParams();

  // NEW: Ref for the entire "texts" container (includes toggle and dropdown)
  const textsRef = useRef(null);

  const handleSectionOpen = (event) => {
    // NEW: Stop propagation to prevent outside click handler from triggering
    event.stopPropagation();
    setIsSectionsOpen(!isSectionsOpen);
  };

  const handleHeaderClick = () => {
    setIsSectionsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      easing: "ease-in-out",
    });
  };

  // NEW: Outside click handler
  const handleClickOutside = (event) => {
    if (textsRef.current && !textsRef.current.contains(event.target)) {
      setIsSectionsOpen(false);
    }
  };

  // NEW: useEffect to add/remove document click listener
  useEffect(() => {
    if (isSectionsOpen) {
      // Add listener when dropdown opens
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove listener when closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSectionsOpen]); // Re-runs when isSectionsOpen changes

  const isEnglish = language === "en";
  const englishIMG = isEnglish ? "english-img" : "";

  return (
    <>
      <header>
        <div className="header-container">
          <div className="right">
            <Link to={`/${language}`}>
              <img
                src={language === "ge" ? sakstatLogo : sakstatLogoEn}
                alt="sakstat-logo"
                onClick={handleHeaderClick}
                style={{ cursor: "pointer", maxWidth: "120px" }}
                className={englishIMG}
              />
            </Link>

            {isEnglish ? (
              <h1>{text[language].sakstat}</h1>
            ) : (
              <h1>
                <Svg />
              </h1>
            )}
          </div>
          <div className="left">
            {/* UPDATED: Ref applied to the entire "texts" div for better outside detection */}
            <div className="texts" ref={textsRef}>
              <Link to={`/${language}`}>
                <h1 onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
                  {text[language].header1}
                </h1>
              </Link>
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
                        <Link to={section.href} key={i}>
                          <li key={i} onClick={() => setIsSectionsOpen(false)}>
                            <p>{section[`name_${language}`]}</p>
                          </li>
                        </Link>
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
