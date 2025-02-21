// src/assets/components/Section/Section.js
import sections from "../../../../sections";
import { useContext, useEffect } from "react";
import { SectionsContext } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";

const Section = () => {
  const { sectionID } = useContext(SectionsContext);
  const navigate = useNavigate();
  const { language } = useParams();

  useEffect(() => {
    if (sectionID !== null) {
      const section = sections.find((section) => section.id === sectionID);
      if (section) {
        navigate(`/${language}/${section.href}`);
      }
    }
  }, [sectionID, navigate]);

  return null;
};

export default Section;
