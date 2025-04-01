/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_1 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 31;
  const [filteredData, setFilteredData] = useState([]);

  const text = {
    ka: {
      title: "ენერგორესურსების საბოლოო მოხმარება ენერგიის სახეების მიხედვით",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final consumption of energy resources by type of energy",
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
      <div
        className="legend-container ss"
        style={{ marginTop: language === "en" ? "0px" : "-20px" }}>
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
    Electricity: "#9747FF",
    "Natural gas": "#244966",
    "Road diesel and other gas oil": "#138C00",
    "Geothermal, solar, etc.": "#EB4C4B",
    "Biofuel and waste": "#30B0C7",
    Coal: "#084E99",
    "Oil products": "#016C7D",
  };

  const sortedFilteredData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const lastYear = years[years.length - 1];
      return b[lastYear] - a[lastYear];
    });
  }, [filteredData, years]);

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart ">
          <div className="header-container">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 14C1 8.21158 1 5.31737 2.63937 3.39884C2.87291 3.12516 3.12607 2.872 3.39884 2.63937C5.31737 1 8.21158 1 14 1C19.7884 1 22.6826 1 24.6012 2.63937C24.8748 2.87291 25.128 3.12607 25.3606 3.39884C27 5.31737 27 8.21158 27 14C27 19.7884 27 22.6826 25.3606 24.6012C25.1271 24.8748 24.8739 25.128 24.6012 25.3606C22.6826 27 19.7884 27 14 27C8.21158 27 5.31737 27 3.39884 25.3606C3.12516 25.1271 2.872 24.8739 2.63937 24.6012C1 22.6826 1 19.7884 1 14Z"
                stroke="#1E1E1E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.70249 13.4499L14.1748 6.07414C14.6031 5.49666 15.405 5.85519 15.405 6.62424V12.3333C15.405 12.7931 15.7198 13.1667 16.1084 13.1667H18.7686C19.3734 13.1667 19.6964 14.0123 19.2968 14.5501L13.8245 21.9259C13.3962 22.5034 12.5943 22.1449 12.5943 21.3758V15.6668C12.5943 15.207 12.2795 14.8334 11.8909 14.8334H9.2307C8.62723 14.8334 8.30428 13.9877 8.70386 13.4499"
                stroke="#1E1E1E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={500}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                dataKey="year"
                tickFormatter={(year) => year.replace("y_", "")}
                tickLine={false}
                tickMargin={10} // Added tickMargin for more space
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
              {sortedFilteredData.map((item) => (
                <Area
                  key={item.name_en}
                  type="monotone"
                  dataKey={language === "en" ? item.name_en : item.name_ge}
                  stackId="1"
                  stroke={colorMapping[item.name_ge]}
                  fill={colorMapping[item.name_en]}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_1;
