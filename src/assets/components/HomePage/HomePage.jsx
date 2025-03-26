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
                style={{
                  background: section.background,
                }}>
                <div className="para">
                  <h1>{section[`name_${language}`]}</h1>
                  <div className="svg-container">{section.svg}</div>
                </div>
                <p>{section[`para_${language}`]}</p>
                <div
                  className="learn-more"
                  onClick={() => {
                    handleSectionSelect(section.id);
                  }}>
                  <p> {language === "ka" ? "გაიგე მეტი" : "Learn more"} </p>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
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
