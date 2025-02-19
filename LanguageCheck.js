// src/LanguageCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LanguageCheck = ({ children }) => {
  const navigate = useNavigate();
  const language = window.location.pathname.split("/")[1];

  useEffect(() => {
    if (language !== "ka" && language !== "en") {
      navigate("/ka");
    }
  }, [language, navigate]);

  return children; // Render the children if the language is valid
};

export default LanguageCheck;
