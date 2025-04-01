/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart, // Import LineChart
  Line, // Import Line
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_1 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 33;
  const [filteredData, setFilteredData] = useState([]);

  const geoID = language === "en" ? "consumption-3" : "";

  const text = {
    ka: {
      title: "ენერგორესურსების საბოლოო მოხმარება მრეწველობის სექტორში",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final consumption of energy resources in the industrial sector",
      unit: "ktoe",
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
      const rawData = await fetchDataWithCodes(chartID);
      const filteredData = rawData.filter((el) => el.name_ge !== "სულ");

      setFilteredData(filteredData);

      const stackedData = years.map((year) => {
        const yearData = { year };
        filteredData.forEach((item) => {
          yearData[item.name_en] = item[year]; // Use English names for keys
          yearData[item.name_ge] = item[year]; // Also store Georgian names
        });
        return yearData;
      });

      setData(stackedData);
    };
    fetchData();
  }, [years]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ value, color }, index) => {
            const displayName = payload[index].dataKey;

            return (
              <p key={`item-${index}`} className="text">
                <span style={{ color }} className="before-span">
                  ■
                </span>
                {displayName} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {value.toFixed(1)}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="legend-container ss ss-1" id={geoID}>
        {payload.map((entry, index) => {
          const displayName = entry.dataKey; // Use the same key for both languages

          return (
            <p key={`item-${index}`}>
              <span style={{ color: entry.color }}>■</span>
              {displayName}
            </p>
          );
        })}
      </div>
    );
  };

  const colorMapping = {
    "თუჯი და ფოლადი": "#084E99",
    "ქიმიური და ნავთობქიმიური": "#016C7D",
    "არალითონური მინერალური ნაკეთობები": "#EB4C4B",
    "სატრანსპორტო მოწყობილობები": "#30B0C7",
    სამთომოპოვებითი: "#9747FF",
    "საკვები პროდუქტები, სასმელები და თამბაქო": "#FF9F0A",
    "ცელულოზა-ქაღალდი და ბეჭდვითი საქმიანობა": "#244966",
    "ხე და ხის ნაწარმი": "#17864C",
    "ტექსტილი და ტყავი": "#007C90",
    "მრეწველობის სხვა დარგები": "#8C8C8C",
  };

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart chart-3">
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
          <ResponsiveContainer height="100%">
            <LineChart // Changed to LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                dataKey="year"
                tickFormatter={(year) => year.replace("y_", "")}
                tickLine={false}
                tickMargin={10}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                padding={{ top: 20 }}
                tickLine={false}
                tickMargin={10}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              {filteredData.map((item) => (
                <Line // Changed to Line
                  key={item.name_en}
                  type="monotone"
                  dataKey={language === "en" ? item.name_en : item.name_ge}
                  stroke={colorMapping[item.name_ge]}
                  fill={colorMapping[item.name_en]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_1;
