import { useParams } from "react-router-dom";
import "./Production&Consumption.scss";
import MyTreeMap from "../../../../../Charts/TreeMap";
import "./Production&Consumption";
import PieChartComponent from "../../../../../Charts/PieChart";

const ProductionAndConsumption = () => {
  const { language } = useParams();

  const chart1Info = {
    styles: {
      flexWrap: "wrap",
      gap: "20px",
      marginTop: language !== "en" ? "-30px" : "-40px",
      marginLeft: "100px",
      justifyContent: "start",
    },
    chartID: 28,
    title_ge: "წარმოება",
    title_en: "Production",
    colors: ["#6794DC", "#A367DC", "#6771DC", "#8067DC", "#DC67AB"],
    names: [
      {
        code: 1,
        name_ge: "ელექტროენერგია და თბოენერგია",
        name_en: "Electricity and Heat Production",
      },
      {
        code: 2,
        name_ge: "ბუნებრივი გაზი",
        name_en: "Natural Gas",
      },
      {
        code: 3,
        name_ge: "ქვანახშირი",
        name_en: "Coal",
      },
      {
        code: 36,
        name_ge: "ნავთობპროდუქტები",
        name_en: "Petroleum Products",
      },
      {
        code: 5,
        name_ge: "ბიოსაწვავი და ნარჩენები",
        name_en: "Biofuel and Waste",
      },
    ],
    svg: (
      <svg
        width="27"
        height="28"
        viewBox="0 0 27 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.0345 24.9104C13.8645 26.1516 11.4999 25.7903 11.0237 23.8294C10.9362 23.4684 10.7648 23.1331 10.5232 22.8509C10.2817 22.5688 9.97699 22.3476 9.63384 22.2054C9.2907 22.0632 8.91883 22.0041 8.5485 22.0328C8.17818 22.0615 7.81987 22.1773 7.50274 22.3706C5.39126 23.6569 2.97326 21.2403 4.25958 19.1275C4.45266 18.8105 4.56823 18.4524 4.59687 18.0823C4.62552 17.7122 4.56644 17.3406 4.42444 16.9977C4.28243 16.6548 4.06151 16.3502 3.77964 16.1087C3.49776 15.8672 3.16288 15.6956 2.80221 15.6079C0.399263 15.0249 0.399263 11.6066 2.80221 11.0237C3.1632 10.9362 3.49843 10.7648 3.78063 10.5232C4.06283 10.2817 4.28401 9.97699 4.42618 9.63384C4.56835 9.2907 4.62748 8.91883 4.59877 8.5485C4.57006 8.17818 4.45431 7.81987 4.26095 7.50274C2.97463 5.39126 5.39126 2.97326 7.50411 4.25958C8.87253 5.09158 10.646 4.35537 11.0237 2.80221C11.6066 0.399263 15.0249 0.399263 15.6079 2.80221C15.6954 3.1632 15.8668 3.49843 16.1083 3.78063C16.3499 4.06283 16.6546 4.28401 16.9977 4.42618C17.3409 4.56835 17.7128 4.62748 18.0831 4.59877C18.4534 4.57006 18.8117 4.45431 19.1288 4.26095C21.2403 2.97463 23.6583 5.39126 22.372 7.50411C22.1789 7.82111 22.0634 8.1792 22.0347 8.54927C22.0061 8.91934 22.0651 9.29095 22.2071 9.63389C22.3491 9.97683 22.5701 10.2814 22.8519 10.5229C23.1338 10.7644 23.4687 10.936 23.8294 11.0237C25.2936 11.3795 25.8656 12.7889 25.5454 13.9658M22.8947 18.7895L20.1579 22.8947H25.6316L22.8947 27"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.21094 13.3157C9.21094 14.4045 9.64345 15.4487 10.4133 16.2186C11.1832 16.9885 12.2274 17.421 13.3162 17.421C14.405 17.421 15.4492 16.9885 16.2191 16.2186C16.9889 15.4487 17.4215 14.4045 17.4215 13.3157C17.4215 12.2269 16.9889 11.1827 16.2191 10.4129C15.4492 9.64297 14.405 9.21045 13.3162 9.21045C12.2274 9.21045 11.1832 9.64297 10.4133 10.4129C9.64345 11.1827 9.21094 12.2269 9.21094 13.3157Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  const chart2Info = {
    styles: {
      flexWrap: "wrap",
      gap: "10px",
      marginTop: language !== "en" ? "-220px" : "-220px",
      alignItems: "start",
      flexDirection: "column",
      justifyContent: "start",
    },
    chartID: 31,
    title_ge: "მოხმარება სახეების მიხედვით",
    title_en: "Consumption by type",
    colors: ["#084E99", "#1395BA", "#007BFF", "#3FC8E4", "#A0BFFF", "#6FAEA9"],
    names: [
      {
        code: 43,
        name_ge: "ელექტროენერგია",
        name_en: "Electricity",
      },
      {
        code: 2,
        name_ge: "ბუნებრივი გაზი",
        name_en: "Natural Gas",
      },
      {
        code: 3,
        name_ge: "ქვანახშირი",
        name_en: "Coal",
      },
      {
        code: 36,
        name_ge: "ნავთობპროდუქტები",
        name_en: "Petroleum Products",
      },
      {
        code: 5,
        name_ge: "ბიოსაწვავი და ნარჩენები",
        name_en: "Biofuel and Waste",
      },
      {
        code: 85,
        name_ge: "გეოთერმული, მზის და აშ.",
        name_en: "Geothermal, Solar, etc.",
      },
    ],
    svg: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 14C1 8.21158 1 5.31737 2.63937 3.39884C2.87291 3.12516 3.12607 2.872 3.39884 2.63937C5.31737 1 8.21158 1 14 1C19.7884 1 22.6826 1 24.6012 2.63937C24.8748 2.87291 25.128 3.12607 25.3606 3.39884C27 5.31737 27 8.21158 27 14C27 19.7884 27 22.6826 25.3606 24.6012C25.1271 24.8748 24.8739 25.128 24.6012 25.3606C22.6826 27 19.7884 27 14 27C8.21158 27 5.31737 27 3.39884 25.3606C3.12516 25.1271 2.872 24.8739 2.63937 24.6012C1 22.6826 1 19.7884 1 14Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.70249 13.4499L14.1748 6.07414C14.6031 5.49666 15.405 5.85519 15.405 6.62424V12.3333C15.405 12.7931 15.7198 13.1667 16.1084 13.1667H18.7686C19.3734 13.1667 19.6964 14.0123 19.2968 14.5501L13.8245 21.9259C13.3962 22.5034 12.5943 22.1449 12.5943 21.3758V15.6668C12.5943 15.207 12.2795 14.8334 11.8909 14.8334H9.2307C8.62723 14.8334 8.30428 13.9877 8.70386 13.4499"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  const chart3Info = {
    styles: {
      flexWrap: "wrap",
      gap: "8px",
      marginTop: language !== "en" ? "-240px" : "-240px",
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
      <div className="production-consumption">
        <div className="container-ss">
          <MyTreeMap info={chart1Info} />
          <div className="div">
            <PieChartComponent info={chart2Info} />
            <PieChartComponent info={chart3Info} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductionAndConsumption;
