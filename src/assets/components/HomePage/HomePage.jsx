import "./Homepage.scss";
import text from "./text";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import sections from "../../../../sections";
import { SectionsContext } from "../../../App";
import backgroundImg from "/src/assets/images/homepage/background.jpg";
import Slider from "./Slider/Slider";

const HomePage = () => {
  const { language } = useParams();

  const context = useContext(SectionsContext);
  const { setSectionID, setSelectedSection } = context;

  const handleSectionSelect = (sectionID) => {
    setSelectedSection(sectionID);
    setSectionID(sectionID);
  };

  return (
    <div className="homepage-container">
      <div
        className="upper"
        style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="texts">
          <h1>{text[language].header1}</h1>
          <p>{text[language].header2}</p>
        </div>

        <div className="sections">
          {sections.map((section, i) => {
            return (
              <div
                className="wrapper"
                key={i}
                onClick={() => {
                  handleSectionSelect(section.id);
                }}>
                <div className="para">
                  <h1>{section[`name_${language}`]}</h1>
                  <div
                    className="svg-container"
                    style={{ backgroundColor: section.background }}>
                    {section.svg}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lower">
        <Slider />
      </div>
    </div>
  );
};

export default HomePage;
