import georgianFlag from "/src/assets/images/header/georgian-flag.svg";
import britishFlag from "/src/assets/images/header/british-flag.svg";
import upVectorGray from "/src/assets/images/header/up-vector-gray.svg";
import downVectorGray from "/src/assets/images/header/down-vector-gray.svg";
import { useEffect, useState } from "react";
import text from "../../../../text";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageChanger = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("ka");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "ka" ? "en" : "ka");
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`/${language}/${currentPath}`);
  }, [language]);

  const hovered = isLanguageOpen ? "hovered" : "";

  return (
    <div className="language-changer-container" onClick={handleLanguageChange}>
      <div className="language-changer">
        <div className="wrapper">
          <img
            src={language === "ka" ? georgianFlag : britishFlag}
            className="flag-img"
            alt="flag"
          />
          <p>{text[language].header.language}</p>
          <img
            src={isLanguageOpen ? upVectorGray : downVectorGray}
            alt="vector"
          />
        </div>
        {isLanguageOpen && (
          <div className="language-options">
            <div className={`wrapper ${hovered}`} onClick={toggleLanguage}>
              <img
                src={language === "ka" ? britishFlag : georgianFlag}
                alt="flag"
                className="flag-img"
              />
              <p>
                {language === "ka"
                  ? text["en"].header.language
                  : text["ka"].header.language}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageChanger;
