import { useParams } from "react-router-dom";
import "./Map.scss";

const Map = () => {
  const { language } = useParams();

  const svg = () => {
    return (
      <svg
        width="23"
        height="28"
        viewBox="0 0 23 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.79166 21.8C2.48001 22.3356 1 23.1572 1 24.0802C1 25.6922 5.52725 27 11.1111 27C16.695 27 21.2222 25.6922 21.2222 24.0802C21.2222 23.1572 19.7422 22.3356 17.4305 21.8M14.2708 10.1001C14.2708 10.962 13.9379 11.7887 13.3454 12.3982C12.7528 13.0077 11.9491 13.3501 11.1111 13.3501C10.2731 13.3501 9.46941 13.0077 8.87685 12.3982C8.28428 11.7887 7.95138 10.962 7.95138 10.1001C7.95138 9.23814 8.28428 8.41149 8.87685 7.802C9.46941 7.19251 10.2731 6.8501 11.1111 6.8501C11.9491 6.8501 12.7528 7.19251 13.3454 7.802C13.9379 8.41149 14.2708 9.23814 14.2708 10.1001Z"
          stroke="#084E99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6982 21.1421C12.2713 21.5646 11.702 21.8006 11.1095 21.8006C10.5171 21.8006 9.94774 21.5646 9.52084 21.1421C5.61668 17.2512 0.385452 12.9054 2.93598 6.59518C4.31741 3.18269 7.62879 1 11.1095 1C14.5903 1 17.9029 3.18399 19.2831 6.59518C21.8311 12.8963 16.6125 17.2642 12.6982 21.1421Z"
          stroke="#084E99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const text = {
    ge: {
      title: "ელექტროსადგურების რუკა",
    },

    en: {
      title: "Power Plants Map",
    },
  };

  return (
    <div className="map-container">
      <div className="header-container">
        {svg()}
        <div className="info-wrapper">
          <div className="text-wrapper">
            <h2>{text[language].title}</h2>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1xFFkxTjQ1Rxfz1QA62KOYMIjuGyH6-w&ll=42.20504413014053%2C43.93333055555553&z=8"
        width="100%"
        height="500"
        allowFullScreen></iframe>
    </div>
  );
};

export default Map;
