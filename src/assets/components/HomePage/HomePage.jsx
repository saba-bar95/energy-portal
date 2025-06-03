import "./Homepage.scss";
import text from "./text";
import { useParams } from "react-router-dom";
import sections from "../../../../sections";
import backgroundImg from "/src/assets/images/homepage/background.jpg";
import Slider from "./Slider/Slider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { language } = useParams();

  return (
    <div className="homepage-container">
      <div
        className="upper"
        style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="texts">
          <h1>{text[language].header1}</h1>
        </div>
        <div className="sections">
          {sections.map((section, i) => {
            return (
              <Link key={i} to={section.href}>
                <div className="wrapper">
                  <div className="para">
                    <h1>{section[`name_${language}`]}</h1>
                    <div
                      className="svg-container"
                      style={{ backgroundColor: section.background }}>
                      {section.svg}
                    </div>
                  </div>
                </div>
              </Link>
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
