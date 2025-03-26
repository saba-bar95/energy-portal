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

const Chart_3 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 10;
  const [filteredData, setFilteredData] = useState([]);

  const enID = language === "en" ? "gas-3" : "";

  const text = {
    ka: {
      title: "ბუნებრივი გაზის საბოლოო მოხმარება სექტორების მიხედვით",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final consumption of natural gas by sector",
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
      const filteredData = rawData.filter(
        (el) => el.name === 2 && el.name_ge !== "სულ"
      );
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
      <div id={enID} className="legend-container">
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
    Industry: "#5654D4",
    Transport: "#3FC8E4",
    Residential: "#007C90",
    "Commercial and public services": "#138C00",
    "Agriculture, forestry and fishing": "#FF9F0A",
    Construction: "#ED4C5C",
    Other: "#8C8C8C",
  };

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart chart-5" style={{ paddingBottom: "60px" }}>
          <div className="header-container">
            <svg
              width="23"
              height="26"
              viewBox="0 0 23 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.2812 17.875V13.8125H14.2188V15.8438H16.25V17.875H12.1875V13.8125H10.1562V17.875H6.09375V15.8438H8.125V13.8125H4.0625V17.875H0V26H22.3438V17.875H18.2812ZM20.3125 23.9688H16.25V21.9375H14.2188V23.9688H8.125V21.9375H6.09375V23.9688H2.03125V19.9062H20.3125V23.9688ZM11.1719 12.1875C13.972 12.1875 16.25 9.90945 16.25 7.10938V4.0625H14.2188V5.07812C14.2188 5.63814 13.7631 6.09375 13.2031 6.09375C12.6431 6.09375 12.1875 5.63814 12.1875 5.07812V3.04688C12.1875 1.36683 10.8207 0 9.14062 0H8.125V1.01562C8.125 2.23153 7.75206 2.79094 7.27995 3.49913C6.75147 4.29188 6.09375 5.27841 6.09375 7.10938C6.09375 9.90945 8.3718 12.1875 11.1719 12.1875ZM8.97005 4.62587C9.33507 4.07834 9.76168 3.43845 9.9907 2.49168C10.0954 2.65134 10.1562 2.84212 10.1562 3.04688V5.07812C10.1562 6.75817 11.5231 8.125 13.2031 8.125C13.5107 8.125 13.8077 8.0792 14.0878 7.99404C13.7078 9.24407 12.5444 10.1562 11.1719 10.1562C9.49183 10.1562 8.125 8.78942 8.125 7.10938C8.125 5.89347 8.49794 5.33406 8.97005 4.62587Z"
                fill="black"
              />
            </svg>
            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={800}>
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
              {filteredData.map((item) => (
                <Area
                  key={item.name_en}
                  type="monotone"
                  dataKey={language === "en" ? item.name_en : item.name_ge} // Toggle between English and Georgian names
                  stackId="1"
                  stroke={colorMapping[item.name_en]} // Use the color mapping for stroke
                  fill={colorMapping[item.name_en]} // Use the color mapping for fill
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_3;
