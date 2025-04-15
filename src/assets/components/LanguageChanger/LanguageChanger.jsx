import { useEffect, useState, useRef } from "react";
import georgianFlag from "/src/assets/images/header/georgian-flag.svg";
import britishFlag from "/src/assets/images/header/british-flag.svg";
import upVectorGray from "/src/assets/images/header/up-vector-gray.svg";
import downVectorGray from "/src/assets/images/header/down-vector-gray.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import text from "./text";

const LanguageChanger = () => {
  const params = useParams();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(params.language);
  const [width, setWidth] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Create a ref for the wrapper element
  const wrapperRef = useRef(null);

  const handleLanguageChange = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "ge" ? "en" : "ge";
    setLanguage(newLanguage);
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`/${language}/${currentPath}`);
  }, [language, location.pathname, navigate]);

  useEffect(() => {
    setLanguage(params.language);
  }, [params.language]);

  // Get the width of the wrapper element
  useEffect(() => {
    if (wrapperRef.current) {
      const width = wrapperRef.current.getBoundingClientRect().width;
      setWidth(width);
    }
  }, [isLanguageOpen]); // You can also add dependencies if you want to measure on specific events

  const hovered = isLanguageOpen ? "hovered" : "";

  return (
    <div
      className="language-changer-container"
      onClick={handleLanguageChange}
      style={{ marginRight: width }}>
      <div className="language-changer">
        <div className="wrapper" ref={wrapperRef}>
          {" "}
          {/* Attach the ref here */}
          <img
            src={language === "ge" ? georgianFlag : britishFlag}
            className="flag-img"
            alt="flag"
          />
          <p>{text[language].language}</p>
          <img
            src={isLanguageOpen ? upVectorGray : downVectorGray}
            alt="vector"
          />
        </div>
        {isLanguageOpen && (
          <div className="language-options">
            <div className={`wrapper ${hovered}`} onClick={toggleLanguage}>
              <img
                src={language === "ge" ? britishFlag : georgianFlag}
                alt="flag"
                className="flag-img"
              />
              <p>
                {language === "ge" ? text["en"].language : text["ge"].language}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageChanger;
