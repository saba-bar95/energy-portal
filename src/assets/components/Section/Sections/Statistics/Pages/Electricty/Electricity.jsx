import Chart_1 from "./Chart_1";
import Chart_2 from "./Chart_2";
import Chart_3 from "./Chart_3";
import Chart_4 from "./Chart_4";
import { useParams } from "react-router-dom";
import ChartWithFilters from "../../../../../Charts/ChartWithFilters";
import "./Electricity.scss";

const Electricity = () => {
  const { language } = useParams();

  const chart1Info = {
    chartName: "electricityPriceGel",
    title_ge: "ელექტროენერგიის ფასი",
    title_en: "Electricity price",
    unit_ge: "ლარი/კვტ.სთ",
    unit1_ge: "ლარი/მგვტ.სთ",
    unit_en: "GEL/kWh",
    unit1_en: "GEL/MWh",
    colors: [
      "#ED4C5C",
      "rgb(255, 159, 10)",
      "rgb(86, 84, 212)",
      "#138C00",
      "#30B0C7",
      "#5654D4",
      "#BE6433",
    ],
    svg: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.54618 19.3782C2.53771 17.3684 1.53282 16.3648 1.15972 15.0609C0.785329 13.7571 1.10512 12.3726 1.74472 9.60491L2.11261 8.00853C2.64951 5.67896 2.9186 4.51418 3.71549 3.71599C4.51238 2.9178 5.67847 2.65 8.00804 2.11311L9.60442 1.74391C12.3734 1.10562 13.7566 0.785822 15.0605 1.15892C16.3643 1.53331 17.3679 2.5382 19.3764 4.54668L21.7554 6.92565C25.2536 10.4226 26.9995 12.1698 26.9995 14.3408C26.9995 16.513 25.2523 18.2602 21.7567 21.7559C18.2597 25.2528 16.5125 27 14.3403 27C12.1693 27 10.4208 25.2528 6.92515 21.7572L4.54618 19.3782Z"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M18.4068 18.4069C19.1673 17.6439 19.27 16.5129 18.6356 15.8772C18.0012 15.2415 16.869 15.3455 16.1072 16.1073C15.3467 16.8691 14.2144 16.9718 13.58 16.3374C12.9456 15.703 13.0483 14.5707 13.8101 13.8102M13.8101 13.8102L13.3499 13.35M13.8101 13.8102C14.2404 13.3786 14.789 13.1602 15.2999 13.1641M18.8657 18.8658L18.4055 18.4056C17.8856 18.9269 17.1901 19.1401 16.5999 19.0179"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.4294 11.7813C12.4448 10.766 12.4448 9.11977 11.4294 8.10441C10.4141 7.08906 8.76787 7.08906 7.75252 8.10442C6.73717 9.11977 6.73717 10.766 7.75252 11.7813C8.76787 12.7967 10.4141 12.7967 11.4294 11.7813Z"
          stroke="black"
          strokeWidth="1.5"
        />
      </svg>
    ),
    styles: {
      flexWrap: "wrap",
      gap: "20px",
      marginTop: language === "en" ? "0px" : "-10px",
      marginLeft: "60px",
      fontWeight: 600,
      // justifyContent: "start",
    },
    names: [
      {
        code: 158,
        name_ge: "1000-ზე ნაკლები",
        name_en: "Less than 1000",
      },
      {
        code: 159,
        name_ge: "1000-2500",
        name_en: "1000-2500",
      },
      {
        code: 160,
        name_ge: "2500-5000",
        name_en: "2500-5000",
      },
      {
        code: 161,
        name_ge: "5000-15000",
        name_en: "5000-15000",
      },
      {
        code: 162,
        name_ge: "15000 ან მეტი",
        name_en: "15000 or more",
      },
    ],
    names_n: [
      {
        code: 163,
        name_ge: "20-ზე ნაკლები",
        name_en: "Less than 20",
      },
      {
        code: 164,
        name_ge: "20-500",
        name_en: "20-500",
      },
      {
        code: 165,
        name_ge: "500-2000",
        name_en: "500-2000",
      },
      {
        code: 166,
        name_ge: "2000-20000",
        name_en: "2000-20000",
      },
      {
        code: 167,
        name_ge: "20000-70000",
        name_en: "20000-70000",
      },
      {
        code: 168,
        name_ge: "70000-150000",
        name_en: "70000-150000",
      },
      {
        code: 169,
        name_ge: "150000 ან მეტი",
        name_en: "150000 or more",
      },
    ],
  };

  return (
    <>
      <div className="electricity">
        <div className="ss-container">
          <div className="div">
            <ChartWithFilters info={chart1Info} />
          </div>
          <div className="div">
            <Chart_1 />
            <Chart_2 />
          </div>
          <div className="div">
            <Chart_3 />
            <Chart_4 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Electricity;
