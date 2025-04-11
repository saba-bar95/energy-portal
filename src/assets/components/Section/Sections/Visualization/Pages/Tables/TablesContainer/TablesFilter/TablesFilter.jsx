import { useParams } from "react-router-dom";
import "./TablesFilter.scss";

const TablesFilter = () => {
  const { language } = useParams();
  const text = {
    ge: {
      filter: "ფილტრი",
    },
    en: {
      filter: "Filter",
    },
  };

  const svg = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 3.19023V3.72689C15 4.5342 15 4.93786 14.818 5.2723C14.636 5.60674 14.3049 5.8144 13.6406 6.22972L11.6015 7.50525C11.1563 7.78369 10.933 7.92369 10.7741 8.07691C10.4539 8.37455 10.2322 8.78236 10.1441 9.23577C10.1 9.45743 10.1 9.71721 10.1 10.236V12.3126C10.1 13.7973 10.1 14.5393 9.6324 14.8644C9.1648 15.1895 8.5075 14.9033 7.1922 14.3324C6.5657 14.0602 6.2528 13.9249 6.0764 13.6488C5.9 13.3735 5.9 13.0188 5.9 12.3118V10.2352C5.9 9.71721 5.9 9.45743 5.8552 9.23577C5.76748 8.78257 5.54628 8.37478 5.2266 8.07691C5.067 7.92369 4.8437 7.78369 4.3985 7.50525L2.3594 6.22972C1.6951 5.8144 1.3633 5.60751 1.182 5.27308C1 4.93708 1 4.53343 1 3.72611V3.18945"
          stroke="#1E1E1E"
          strokeWidth="1.5"
        />
        <path
          d="M15 3.1894C15 2.15731 15 1.64165 14.692 1.32044C14.3854 1 13.8905 1 12.9 1H3.1C2.1102 1 1.6153 1 1.308 1.32044C1.0007 1.64088 1 2.15731 1 3.1894"
          stroke="#1E1E1E"
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  return (
    <div className="table-filter">
      <p>{svg()}</p>
      <p>{text[`${language}`].filter}</p>
    </div>
  );
};

export default TablesFilter;
