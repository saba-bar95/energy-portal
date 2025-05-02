import { useState } from "react";
import "./Slider.scss"; // Import your CSS file for styling
import { useParams } from "react-router-dom";
import EnergyProduction from "./EnergyProduction";
import Consumption from "./Consumption";
import Resources from "./Resources";

const Slider = () => {
  const { language } = useParams();

  const slides = [
    { header_ge: "ენერგორესურსების წარმოება", header_en: "Energy Production" },
    {
      header_ge: "მოხმარებული ენერგორესურსები",
      header_en: "Energy Resources Consumed",
    },
    {
      header_ge: "ენერგორესურსების მოხმარება სექტორების მიხედვით",
      header_en: "Energy Consumption by Sector",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const slideContents = [
    <EnergyProduction key="energy-production" />,
    <Consumption key="consumption" />,
    <Resources key="resources" />,
  ];

  return (
    <div className="slider">
      <div className="top-side">
        <div className="dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)} // Allow clicking on dots to navigate
            />
          ))}
        </div>
        <div className="slide">
          <h2>{slides[currentIndex][`header_${language}`]} - 2023</h2>
        </div>
        <div className="navigation">
          <button
            onClick={prevSlide}
            className={currentIndex === 0 ? "disabled" : ""}
            disabled={currentIndex === 0}>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.2 1L0.999999 8M0.999999 8L8.2 15M0.999999 8L17 8"
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={currentIndex === slides.length - 1 ? "disabled" : ""}
            disabled={currentIndex === slides.length - 1}>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.8 15L17 8M17 8L9.8 1M17 8L1 8"
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="content-container">
        {slideContents[currentIndex]} {/* Render the corresponding content */}
      </div>
    </div>
  );
};

export default Slider;
