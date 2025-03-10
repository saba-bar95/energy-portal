/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";

const Chart_4 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);

  const text = {
    ka: {
      title: "ელექტროენერგიის საბოლოო მოხმარება მრეწველობის სექტორში",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final electricity consumption in the industrial sector",
      unit: "Thousand tons",
    },
  };

  const years = useMemo(
    () => [
      "y_2013",
      "y_2014",
      "y_2015",
      "y_2016",
      "y_2017",
      "y_2018",
      "y_2019",
      "y_2020",
      "y_2021",
      "y_2022",
      "y_2023",
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.27:3000/api/resourceswithcodes/7"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rawData = await response.json();

        const filteredData = rawData.filter((item) => item.name_ge !== "სულ");

        console.log(filteredData);

        setData(filteredData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [years]);

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart">
          <div className="header-container">
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
            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={600}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}></BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_4;
