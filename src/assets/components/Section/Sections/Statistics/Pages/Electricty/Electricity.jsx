import Chart_1 from "./Chart_1";
import Chart_2 from "./Chart_2";
import Chart_3 from "./Chart_3";
import Chart_4 from "./Chart_4";
import { useParams } from "react-router-dom";
import PieChartComponent from "../../../../../Charts/PieChart";
import ChartWithFilters from "../../../../../Charts/ChartWithFilters";
import "./Electricity.scss";

const Electricity = () => {
  const { language } = useParams();

  const chart1Info = {
    tick: true,
    chartID: 142,
    chartName: "electricityPriceGel",
    title_ge: "ელექტროენერგიის ფასი",
    title_en: "Electricity price",
    unit_ge: "ლარი/კვტ.სთ",
    unit_en: "GEL/GWh",
    colors: [
      "#ED4C5C",
      "rgb(255, 159, 10)",
      "rgb(86, 84, 212)",
      "#138C00",
      "#30B0C7",
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
      // justifyContent: "start",
    },
    names: [
      {
        code: 158,
        name_ge: "1000-ზე ნაკლები",
        name_en: "1000 or less",
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
        name_ge: "15000 ან  მეტი",
        name_en: "1500 or more",
      },
    ],
  };

  const chart3Info = {
    styles: {
      flexWrap: "wrap",
      gap: "15px",
      marginTop: language !== "en" ? "-170px" : "-170px",
      alignItems: "start",
      flexDirection: "column",
      justifyContent: "start",
    },
    chartID: 32,
    title_ge: "მოხმარება სექტორების მიხედვით",
    title_en: "Consumption by sector",
    colors: ["#6FAEA9", "#556EB0", "#5A9FDE", "#D5A43F", "#BE6433", "#994C8E"],
    names: [
      {
        code: 44,
        name_ge: "მრეწველობა",
        name_en: "Industry",
      },
      {
        code: 49,
        name_ge: "მშენებლობა",
        name_en: "Construction",
      },
      {
        code: 45,
        name_ge: "ტრანსპორტი",
        name_en: "Transport",
      },
      {
        code: 47,
        name_ge: "კერძო და სახელმწიფო მომსახურება",
        name_en: "Private and Public Services",
      },
      {
        code: 46,
        name_ge: "შინამეურნეობები",
        name_en: "Households",
      },
      {
        code: 48,
        name_ge: "სოფლის, სატყეო და თევზის მეურნეობა",
        name_en: "Agriculture, forestry and fisheries",
      },
      {
        code: 50,
        name_ge: "სხვა",
        name_en: "Other",
      },
    ],
    svg: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25.6173 7.26116C25.3806 7.12537 25.0893 7.12654 24.8538 7.26436L17.3164 11.6722V7.92188C17.3164 7.64898 17.1704 7.39695 16.9337 7.26116C16.697 7.12537 16.4057 7.12654 16.1702 7.26436L8.63281 11.6722V0.761719C8.63281 0.341047 8.29177 0 7.87109 0H0.761719C0.341047 0 0 0.341047 0 0.761719V25.2383C0 25.659 0.341047 26 0.761719 26H25.2383C25.659 26 26 25.659 26 25.2383V7.92188C26 7.64898 25.854 7.39695 25.6173 7.26116ZM1.52344 1.52344H7.10938V2.53906H1.52344V1.52344ZM24.4766 24.4766H1.52344V4.0625H7.10938V13C7.10938 13.5878 7.74891 13.9538 8.25561 13.6575L15.793 9.2497V13C15.793 13.5878 16.4325 13.9538 16.9392 13.6575L24.4766 9.2497V24.4766Z"
          fill="#1E1E1E"
        />
        <path
          d="M10.918 16.834H7.87109C7.45042 16.834 7.10938 17.175 7.10938 17.5957V20.6426C7.10938 21.0633 7.45042 21.4043 7.87109 21.4043H10.918C11.3386 21.4043 11.6797 21.0633 11.6797 20.6426V17.5957C11.6797 17.175 11.3386 16.834 10.918 16.834ZM10.1562 19.8809H8.63281V18.3574H10.1562V19.8809Z"
          fill="#1E1E1E"
        />
        <path
          d="M19.6016 16.834H16.5547C16.134 16.834 15.793 17.175 15.793 17.5957V20.6426C15.793 21.0633 16.134 21.4043 16.5547 21.4043H19.6016C20.0222 21.4043 20.3633 21.0633 20.3633 20.6426V17.5957C20.3633 17.175 20.0222 16.834 19.6016 16.834ZM18.8398 19.8809H17.3164V18.3574H18.8398V19.8809Z"
          fill="#1E1E1E"
        />
      </svg>
    ),
  };

  return (
    <>
      <div className="electricity">
        <div className="div">
          <ChartWithFilters info={chart1Info} />
          <PieChartComponent info={chart3Info} />
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
    </>
  );
};

export default Electricity;
