import "./TableDownloadBtn.scss";
import { useParams } from "react-router-dom";

const TableDownloadBtn = () => {
  const text = {
    en: {
      header: "Download",
    },
    ge: {
      header: "გადმოწერა",
    },
  };
  const { language } = useParams();

  const svg = () => {
    return (
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 11.3907V12.2903C1 13.009 1.28548 13.6982 1.79365 14.2064C2.30181 14.7145 2.99103 15 3.70968 15H12.7419C13.4606 15 14.1498 14.7145 14.658 14.2064C15.1661 13.6982 15.4516 13.009 15.4516 12.2903V11.3871M8.22581 1V10.9355M8.22581 10.9355L11.3871 7.77419M8.22581 10.9355L5.06452 7.77419"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="table-download-btn">
      <p>{svg()}</p>
      <p>{text[`${language}`].header} </p>
    </div>
  );
};

export default TableDownloadBtn;
