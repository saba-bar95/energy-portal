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

const Chart_4 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 21;
  const [filteredData, setFilteredData] = useState([]);

  const id = language === "ka" ? "chart-ss" : "";

  const text = {
    ka: {
      title: "ნავთობპროდუქტების საბოლოო მოხმარება სახეების მიხედვით",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final consumption of petroleum products by type",
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
      <div id={id} className="legend-container" style={{ marginTop: "-100px" }}>
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
    "Liquefied Petroleum Gases (LPG)": "#5654D4",
    "Motor gasoline": "#3FC8E4",
    "Kerosene type jet fuel": "#007C90",
    "Road diesel and other gas oil": "#138C00",
    "Fuel oil": "#FF9F0A",
    "საპოხი მასალები": "#ED4C5C",
    Bitumen: "#A30000",
    "Other petroleum products": "#8C8C8C",
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
        <div className="main-chart chart-5">
          <div className="header-container">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.1719 22.1406C9.49183 22.1406 8.125 20.7738 8.125 19.0938C8.125 18.6755 8.24449 17.9133 9.27773 16.1322C9.79961 15.2325 10.3145 14.4854 10.3362 14.454C10.5258 14.1795 10.8382 14.0156 11.1719 14.0156C11.5055 14.0156 11.8179 14.1795 12.0075 14.454C12.0292 14.4854 12.5441 15.2325 13.066 16.1322C14.0993 17.9133 14.2188 18.6755 14.2188 19.0938C14.2188 20.7738 12.8519 22.1406 11.1719 22.1406ZM11.1719 16.9184C11.128 16.992 11.0838 17.067 11.0396 17.143C10.1782 18.6264 10.1568 19.0764 10.1562 19.0949C10.1562 19.6538 10.6119 20.1094 11.1719 20.1094C11.7316 20.1094 12.187 19.6542 12.1875 19.0946C12.1867 19.0712 12.1604 18.6156 11.2979 17.1324C11.2558 17.06 11.2137 16.9885 11.1719 16.9184Z"
                fill="black"
              />
              <path
                d="M13.2031 4.0625H9.14062C7.46058 4.0625 6.09375 5.42933 6.09375 7.10938V9.14062C6.09375 10.8207 7.46058 12.1875 9.14062 12.1875H13.2031C14.8832 12.1875 16.25 10.8207 16.25 9.14062V7.10938C16.25 5.42933 14.8832 4.0625 13.2031 4.0625ZM14.2188 9.14062C14.2188 9.70064 13.7631 10.1562 13.2031 10.1562H9.14062C8.58061 10.1562 8.125 9.70064 8.125 9.14062V7.10938C8.125 6.54936 8.58061 6.09375 9.14062 6.09375H13.2031C13.7631 6.09375 14.2188 6.54936 14.2188 7.10938V9.14062Z"
                fill="black"
              />
              <path
                d="M22.8876 7.23262L20.3125 4.65745V4.0625C20.3125 1.82244 18.4901 0 16.25 0H6.09375C3.85369 0 2.03125 1.82244 2.03125 4.0625V23.9688H1.01562C0.454695 23.9688 0 24.4234 0 24.9844C0 25.5453 0.454695 26 1.01562 26H21.3281C21.8891 26 22.3438 25.5453 22.3438 24.9844C22.3438 24.4234 21.8891 23.9688 21.3281 23.9688H20.3125V21.9659C20.6304 22.0787 20.9721 22.1406 21.3281 22.1406C23.0082 22.1406 24.375 20.7738 24.375 19.0938V10.8234C24.375 9.46694 23.8468 8.19173 22.8876 7.23262ZM22.3438 19.0938C22.3438 19.6538 21.8881 20.1094 21.3281 20.1094C20.7681 20.1094 20.3125 19.6538 20.3125 19.0938V14.2188H22.3438V19.0938ZM22.3438 12.1875H19.2969C18.7359 12.1875 18.2812 12.6422 18.2812 13.2031V23.9688H4.0625V4.0625C4.0625 2.94247 4.97372 2.03125 6.09375 2.03125H16.25C17.37 2.03125 18.2812 2.94247 18.2812 4.0625V9.14062C18.2812 9.70155 18.7359 10.1562 19.2969 10.1562C19.8578 10.1562 20.3125 9.70155 20.3125 9.14062V7.53005L21.4513 8.66887C22.0268 9.24432 22.3438 10.0095 22.3438 10.8233V12.1875Z"
                fill="black"
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

export default Chart_4;
