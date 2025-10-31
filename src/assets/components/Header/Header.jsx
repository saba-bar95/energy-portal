import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import sakstatLogo from "/src/assets/images/header/sakstat-logo.svg";
import sakstatLogoEn from "/src/assets/images/header/sakstat-logo-en.png";
import downVectorBlack from "/src/assets/images/header/down-vector-black.svg";
import upVectorBlack from "/src/assets/images/header/up-vector-black.svg";
import sections from "../../../../sections";
import Socials from "../Socials/Socials";
import text from "./text";
import LanguageChanger from "../LanguageChanger/LanguageChanger";
import Svg from "./Svg";

const Header = () => {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { language } = useParams();

  const textsRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollBuffer = useRef(0);
  const ticking = useRef(false);
  const SCROLL_THRESHOLD = 80; // Adjust sensitivity here

  // --------------------------------------------------------------
  // 1. Scroll-direction detection WITH SENSITIVITY
  // --------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const atTop = currentY <= 0;

        if (currentY < lastScrollY.current) {
          // SCROLLING UP
          const scrolledUp = lastScrollY.current - currentY;
          scrollBuffer.current += scrolledUp;

          if (scrollBuffer.current >= SCROLL_THRESHOLD || atTop) {
            setIsHeaderVisible(true);
          }
        } else if (currentY > lastScrollY.current) {
          // SCROLLING DOWN
          setIsHeaderVisible(false);
          scrollBuffer.current = 0; // Reset buffer
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Only one useEffect!

  // --------------------------------------------------------------
  // 2. Dropdown toggle
  // --------------------------------------------------------------
  const handleSectionOpen = (e) => {
    e.stopPropagation();
    setIsSectionsOpen((prev) => !prev);
  };

  const handleHeaderClick = () => {
    setIsSectionsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --------------------------------------------------------------
  // 3. Click-outside for dropdown
  // --------------------------------------------------------------
  const handleClickOutside = (e) => {
    if (textsRef.current && !textsRef.current.contains(e.target)) {
      setIsSectionsOpen(false);
    }
  };

  useEffect(() => {
    if (isSectionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSectionsOpen]);

  // --------------------------------------------------------------
  // 4. Helpers
  // --------------------------------------------------------------
  const isEnglish = language === "en";
  const englishIMG = isEnglish ? "english-img" : "";

  return (
    <header className={`header ${isHeaderVisible ? "header--visible" : ""}`}>
      <div className="header-container">
        {/* RIGHT */}
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

        {/* LEFT */}
        <div className="left">
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
                  {sections.map((section, i) => (
                    <Link to={section.href} key={i}>
                      <li onClick={() => setIsSectionsOpen(false)}>
                        <p>{section[`name_${language}`]}</p>
                      </li>
                    </Link>
                  ))}
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
  );
};

export default Header;
