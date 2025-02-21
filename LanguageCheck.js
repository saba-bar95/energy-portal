// src/LanguageCheck.js
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LanguageCheck = ({ children }) => {
  const navigate = useNavigate();
  const { language } = useParams(); // Use useParams to get the language

  useEffect(() => {
    if (language !== "ka" && language !== "en") {
      navigate("/ka");
    }
  }, [language, navigate]);

  return children; // Render the children if the language is valid
};

export default LanguageCheck;
