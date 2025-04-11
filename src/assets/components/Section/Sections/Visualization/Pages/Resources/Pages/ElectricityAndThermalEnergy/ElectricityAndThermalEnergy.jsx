import "./ElectricityAndThermalEnergy.scss";
import VerticalStackedByYears from "../../../../../../../Charts/VerticalStackedBarsByYear";
import LineChartByYears from "../../../../../../../Charts/LineChartByYears";
import VerticalBarsByYears from "../../../../../../../Charts/VerticalBarsByYears";
import StackedAreaChart from "../../../../../../../Charts/StackedAreaChart";
import HorizontalBarsByYears from "../../../../../../../Charts/HorizontalBarsByYears";
import { useParams } from "react-router-dom";

const ElectricityAndThermalEnergy = () => {
  const { language } = useParams();

  const chart1Info = {
    chartID: 7,
    chartName: 1,
    title_ge: "ელექტროენერგიის და თბოენერგიის წარმოება",
    unit_ge: "ათასი ტნე",
    title_en: "Electricity and heat production",
    unit_en: "ktoe",
    colors: ["#5654D4", "#3FC8E4", "#007C90", "#ED4C5C", "#FF9F0A"],
    svg: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25.2296 24.4873H22.4852L17.1407 7.09091H23.9296V8.60364C23.9296 9.02909 24.2667 9.36 24.7 9.36C25.1333 9.36 25.4704 9.02909 25.4704 8.60364V6.33455C25.4704 6.09818 25.3259 5.86182 25.1333 5.72L16.6593 0.236364C16.5148 0.0945454 16.3222 0 16.1296 0H9.91852C9.72593 0 9.53333 0.0945455 9.38889 0.189091L0.818519 5.67273C0.625926 5.81455 0.481481 6.05091 0.481481 6.33455V8.60364C0.481481 9.02909 0.818519 9.36 1.25185 9.36C1.68519 9.36 2.02222 9.02909 2.02222 8.60364V7.09091H8.81111L3.51482 24.4873H0.77037C0.337037 24.4873 0 24.8182 0 25.2436C0 25.6691 0.337037 26 0.77037 26H25.2296C25.663 26 26 25.6691 26 25.2436C26 24.8182 25.663 24.4873 25.2296 24.4873ZM9.62963 9.83273L11.7 11.2509L8.52222 13.4727L9.62963 9.83273ZM17.4778 13.52L14.3 11.2982L16.3704 9.88L17.4778 13.52ZM18.2963 16.2145L20.463 23.3527L14.3 19.0509L18.2963 16.2145ZM17.1889 15.1273L13 18.0582L8.81111 15.1273L13 12.1964L17.1889 15.1273ZM7.65556 16.2145L11.6519 19.0036L5.48889 23.3055L7.65556 16.2145ZM13 19.9491L19.4519 24.4873H6.54815L13 19.9491ZM10.6407 5.57818V1.51273H15.3593V5.57818H10.6407ZM9.1 5.57818H3.85185L9.1 2.17455V5.57818ZM16.9 2.17455L22.1481 5.57818H16.9V2.17455ZM15.5519 7.09091L15.937 8.32L13 10.3527L10.063 8.32L10.4481 7.09091H15.5519Z"
          fill="#1E1E1E"
        />
      </svg>
    ),
    styles: {
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "-30px",
      marginLeft: "100px",
      justifyContent: "start",
      width: "80%",
    },
  };

  const chart2Info = {
    chartID: 8,
    chartName: 1,
    title_ge: "საერთაშორისო ვაჭრობა",
    title_en: "International trade",
    unit_ge: "ათასი ტნე",
    unit_en: "ktoe",
    colors: ["#30B0C7", "#ED4C5C"],
    legend: true,
    svg: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.08461 20.3555L1.08464 20.3555L1.07781 20.3506C0.864041 20.1982 0.75 19.9731 0.75 19.7294C0.75 19.5016 0.860216 19.2696 1.08729 19.1013C1.08763 19.101 1.08797 19.1008 1.0883 19.1005L7.54445 14.3672L7.54495 14.3668C7.81748 14.1667 8.1882 14.1292 8.50361 14.2791C8.82032 14.4296 8.98851 14.7104 8.98851 15.005V16.4941V17.2441H9.73851H16.6254C17.1571 17.2441 17.521 17.6476 17.521 18.0582V21.3684C17.521 21.7832 17.1527 22.1825 16.6254 22.1825H9.73851H8.98851V22.9325V24.4323C8.98851 24.7269 8.82032 25.0078 8.50361 25.1583C8.1882 25.3082 7.81748 25.2706 7.54495 25.0705L7.54314 25.0692L1.08461 20.3555Z"
          stroke="#1E1E1E"
          strokeWidth="1.5"
        />
        <path
          d="M16.262 3.81732H17.012V3.06732V1.56753C17.012 1.27295 17.1802 0.992066 17.4969 0.84156C17.8123 0.69167 18.183 0.729184 18.4555 0.92934L18.4567 0.930186L24.9152 5.65452L24.9152 5.65457L24.9227 5.65991C25.1364 5.81229 25.2505 6.03745 25.2505 6.28116C25.2505 6.50875 25.1404 6.74059 24.9137 6.90886C24.9132 6.90925 24.9127 6.90964 24.9122 6.91003L18.4573 11.6209L18.4555 11.6223C18.183 11.8224 17.8123 11.8599 17.4969 11.71C17.1802 11.5595 17.012 11.2787 17.012 10.9841V9.495V8.745H16.262H9.37512C8.84339 8.745 8.47949 8.34153 8.47949 7.93093V4.62068C8.47949 4.2166 8.83652 3.81732 9.37512 3.81732H16.262Z"
          stroke="#1E1E1E"
          strokeWidth="1.5"
        />
      </svg>
    ),
  };

  const chart3Info = {
    chartID: 9,
    chartName: 1,
    title_ge:
      "ელექტროენერგიის და თბოენერგიის საბოლოო მოხმარება სახეების მიხედვით",
    unit_ge: "ათასი ტნე",
    title_en: "Final consumption of Electricity and heat by type",
    unit_en: "ktoe",
    colors: ["#30B0C7", "#138C00", "#ED4C5C"],
    legend: true,
    svg: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.1924 3.80758C19.737 1.35225 16.4724 0 13 0C9.52758 0 6.263 1.35225 3.80758 3.80758C1.35688 6.25833 0.00512891 9.58567 0 13.0508C0 16.0574 1.04939 18.9697 2.95689 21.2873C4.83823 23.5731 7.46205 25.1614 10.345 25.7597C10.5531 25.8028 10.7623 25.824 10.9701 25.824C11.6645 25.824 12.3412 25.5869 12.8915 25.1391C13.6053 24.5583 14.0148 23.6975 14.015 22.7772L14.0156 18.3848C16.2729 17.9249 17.9767 15.9243 17.9767 13.5332V10.918C17.9767 10.357 17.522 9.90234 16.961 9.90234H16.0978V7.3125C16.0978 6.75157 15.6431 6.29688 15.0821 6.29688C14.5212 6.29688 14.0665 6.75157 14.0665 7.3125V9.90234H12.0353V7.3125C12.0353 6.75157 11.5806 6.29688 11.0196 6.29688C10.4587 6.29688 10.004 6.75157 10.004 7.3125V9.90234H9.08994C8.52902 9.90234 8.07432 10.357 8.07432 10.918V13.5332C8.07432 15.9062 9.75254 17.8943 11.9844 18.3739L11.9837 22.7769C11.9837 23.1965 11.7493 23.4498 11.6096 23.5635C11.3705 23.7579 11.0601 23.8335 10.7578 23.7708C5.70685 22.7226 2.03917 18.2166 2.03018 13.0508C2.03018 13.0508 2.0313 13.0635 2.0313 13.0508C2.0313 7.00258 6.95185 2.03125 13.0001 2.03125C19.0483 2.03125 23.9688 6.9518 23.9688 13C23.9688 17.4341 21.3416 21.4124 17.2757 23.1352C16.7592 23.354 16.5179 23.9501 16.7368 24.4666C16.9557 24.9831 17.5518 25.2244 18.0682 25.0054C20.3888 24.0222 22.3648 22.388 23.7826 20.2795C25.2332 18.1222 26 15.6049 26 13C26 9.52758 24.6478 6.26295 22.1924 3.80758ZM10.1055 13.5332V11.9336H15.9453V13.5332C15.9453 15.1433 14.6355 16.4531 13.0254 16.4531C11.4153 16.4531 10.1055 15.1432 10.1055 13.5332Z"
          fill="black"
        />
      </svg>
    ),
  };

  const chart4Info = {
    chartID: 11,
    chartName: 1,
    title_ge: "ელექტროენერგიის საბოლოო მოხმარება მრეწველობის სექტორში",
    title_en: "Final electricity consumption in the industrial sector",
    unit_ge: "ათასი ტნე",
    unit_en: "ktoe",
    color: "#3498DB",
    initialYear: 2023,
    legend: true,
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

  const chart5Info = {
    chartID: 10,
    chartName: 1,
    title_ge:
      "ელექტროენერგიის და თბოენერგიის საბოლოო მოხმარება სექტორების მიხედვით",
    title_en: "Final consumption of Electricity and heat by sectors",
    unit_ge: "ათასი ტნე",
    unit_en: "ktoe",
    colors: [
      "#5654D4",
      "#3FC8E4",
      "#007C90",
      "#138C00",
      "#FF9F0A",
      "#ED4C5C",
      "#8C8C8C",
    ],
    legend: true,
    svg: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 0C13.4487 0 13.8125 0.363772 13.8125 0.8125V2.03125C13.8125 2.47998 13.4487 2.84375 13 2.84375C12.5513 2.84375 12.1875 2.47998 12.1875 2.03125V0.8125C12.1875 0.363772 12.5513 0 13 0ZM6.09375 0.92135C6.48237 0.696987 6.97929 0.830139 7.20363 1.21875L7.813 2.27422C8.03741 2.66283 7.90424 3.15975 7.51562 3.38411C7.12701 3.60848 6.63008 3.47533 6.40575 3.08672L5.79637 2.03125C5.57196 1.64264 5.70513 1.14572 6.09375 0.92135ZM19.9062 0.92135C20.2949 1.14572 20.428 1.64264 20.2036 2.03125L19.5942 3.08672C19.3699 3.47533 18.873 3.60848 18.4844 3.38411C18.0958 3.15975 17.9626 2.66283 18.187 2.27422L18.7964 1.21875C19.0207 0.830139 19.5176 0.696987 19.9062 0.92135ZM13 5.6875C12.0397 5.6875 11.0888 5.87665 10.2017 6.24414C9.31442 6.61164 8.50834 7.15024 7.82925 7.82925C7.15024 8.50834 6.61164 9.31442 6.24414 10.2016C5.87665 11.0888 5.6875 12.0397 5.6875 13C5.6875 13.9603 5.87665 14.9112 6.24414 15.7984C6.61164 16.6856 7.15024 17.4917 7.82925 18.1707C8.50834 18.8498 9.31442 19.3884 10.2016 19.7559C11.0888 20.1234 12.0397 20.3125 13 20.3125C13.9603 20.3125 14.9112 20.1234 15.7984 19.7559C16.6856 19.3884 17.4917 18.8498 18.1707 18.1707C18.8498 17.4917 19.3884 16.6856 19.7559 15.7984C20.1234 14.9112 20.3125 13.9603 20.3125 13C20.3125 12.0397 20.1234 11.0888 19.7559 10.2017C19.3884 9.31442 18.8498 8.50834 18.1707 7.82925C17.4917 7.15024 16.6856 6.61164 15.7984 6.24414C14.9112 5.87665 13.9603 5.6875 13 5.6875ZM9.57978 4.74282C10.6641 4.29367 11.8263 4.0625 13 4.0625C14.1737 4.0625 15.3359 4.29367 16.4202 4.74283C17.5046 5.19196 18.4898 5.85033 19.3198 6.68021C20.1497 7.51018 20.808 8.49542 21.2572 9.57978C21.7063 10.6641 21.9375 11.8263 21.9375 13C21.9375 14.1737 21.7063 15.3359 21.2572 16.4202C20.808 17.5046 20.1497 18.4898 19.3198 19.3198C18.4898 20.1497 17.5046 20.808 16.4202 21.2572C15.3359 21.7063 14.1737 21.9375 13 21.9375C11.8263 21.9375 10.6641 21.7063 9.57978 21.2572C8.49542 20.808 7.51018 20.1497 6.68021 19.3198C5.85033 18.4898 5.19196 17.5046 4.74282 16.4202C4.29367 15.3359 4.0625 14.1737 4.0625 13C4.0625 11.8263 4.29367 10.6641 4.74283 9.57978C5.19196 8.49542 5.85033 7.51018 6.68021 6.68021C7.51018 5.85033 8.49542 5.19196 9.57978 4.74282ZM0.92135 6.09375C1.14572 5.70513 1.64264 5.57196 2.03125 5.79637L3.08672 6.40575C3.47533 6.63008 3.60848 7.12701 3.38411 7.51562C3.15975 7.90424 2.66283 8.03741 2.27422 7.813L1.21875 7.20363C0.830139 6.97929 0.696987 6.48237 0.92135 6.09375ZM25.0786 6.09375C25.303 6.48237 25.1699 6.97929 24.7812 7.20363L23.7258 7.813C23.3372 8.03741 22.8403 7.90424 22.6159 7.51562C22.3915 7.12701 22.5247 6.63008 22.9133 6.40575L23.9688 5.79637C24.3574 5.57196 24.8543 5.70513 25.0786 6.09375ZM14.0944 7.36296C14.4133 7.48093 14.625 7.78497 14.625 8.125V10.5625H17.0625C17.3703 10.5625 17.6516 10.7364 17.7892 11.0116C17.9268 11.2869 17.8972 11.6163 17.7125 11.8625L12.8375 18.3625C12.6276 18.6422 12.2623 18.7564 11.9306 18.6458C11.5988 18.5352 11.375 18.2247 11.375 17.875V14.625H8.9375C8.62022 14.625 8.33194 14.4403 8.19934 14.152C8.06674 13.8638 8.11411 13.5246 8.32057 13.2837L13.1956 7.59623C13.4169 7.33809 13.7755 7.24498 14.0944 7.36296ZM10.704 13H12.1875C12.6362 13 13 13.3638 13 13.8125V15.4375L15.4375 12.1875H13.8125C13.3638 12.1875 13 11.8237 13 11.375V10.3214L10.704 13ZM0 13C0 12.5513 0.363772 12.1875 0.8125 12.1875H2.03125C2.47998 12.1875 2.84375 12.5513 2.84375 13C2.84375 13.4487 2.47998 13.8125 2.03125 13.8125H0.8125C0.363772 13.8125 0 13.4487 0 13ZM23.1562 13C23.1562 12.5513 23.52 12.1875 23.9688 12.1875H25.1875C25.6362 12.1875 26 12.5513 26 13C26 13.4487 25.6362 13.8125 25.1875 13.8125H23.9688C23.52 13.8125 23.1562 13.4487 23.1562 13ZM3.38411 18.4844C3.60848 18.873 3.47533 19.3699 3.08672 19.5942L2.03125 20.2036C1.64264 20.428 1.14572 20.2949 0.92135 19.9062C0.696987 19.5176 0.830139 19.0207 1.21875 18.7964L2.27422 18.187C2.66283 17.9626 3.15975 18.0958 3.38411 18.4844ZM22.6159 18.4844C22.8403 18.0958 23.3372 17.9626 23.7258 18.187L24.7812 18.7964C25.1699 19.0207 25.303 19.5176 25.0786 19.9062C24.8543 20.2949 24.3574 20.428 23.9688 20.2036L22.9133 19.5942C22.5247 19.3699 22.3915 18.873 22.6159 18.4844ZM7.51562 22.6159C7.90424 22.8403 8.03741 23.3372 7.813 23.7258L7.20363 24.7812C6.97929 25.1699 6.48237 25.303 6.09375 25.0786C5.70513 24.8543 5.57196 24.3574 5.79637 23.9688L6.40575 22.9133C6.63008 22.5247 7.12701 22.3915 7.51562 22.6159ZM18.4844 22.6159C18.873 22.3915 19.3699 22.5247 19.5942 22.9133L20.2036 23.9688C20.428 24.3574 20.2949 24.8543 19.9062 25.0786C19.5176 25.303 19.0207 25.1699 18.7964 24.7812L18.187 23.7258C17.9626 23.3372 18.0958 22.8403 18.4844 22.6159ZM13 23.1562C13.4487 23.1562 13.8125 23.52 13.8125 23.9688V25.1875C13.8125 25.6362 13.4487 26 13 26C12.5513 26 12.1875 25.6362 12.1875 25.1875V23.9688C12.1875 23.52 12.5513 23.1562 13 23.1562Z"
          fill="#1E1E1E"
        />
      </svg>
    ),
    styles: {
      flexWrap: "wrap",
      gap: "20px",
      marginTop: language === "en" ? "-40px" : "-70px",
      marginLeft: "60px",
      justifyContent: "start",
    },
  };

  return (
    <>
      <div className="charts-container">
        <VerticalStackedByYears info={chart1Info} />
        <LineChartByYears info={chart2Info} />
        <VerticalBarsByYears info={chart3Info} />
        <div className="main-chart chart-4" style={{ flexDirection: "row" }}>
          <HorizontalBarsByYears info={chart4Info} />
        </div>
        <StackedAreaChart info={chart5Info} />
      </div>
    </>
  );
};

export default ElectricityAndThermalEnergy;
