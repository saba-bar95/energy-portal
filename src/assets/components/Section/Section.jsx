// src/assets/components/Section/Section.js
import sections from "../../../../sections";
import { useContext, useEffect } from "react";
import { SectionsContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const { sectionID } = useContext(SectionsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (sectionID !== null) {
      const section = sections.find((section) => section.id === sectionID);
      if (section) {
        navigate(`/ka/${section.href}`);
      }
    }
  }, [sectionID, navigate]);

  return null;
};

export default Section;
