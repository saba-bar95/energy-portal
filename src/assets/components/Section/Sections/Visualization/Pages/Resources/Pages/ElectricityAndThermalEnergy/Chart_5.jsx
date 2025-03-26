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

const Chart_5 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 10;
  const [filteredData, setFilteredData] = useState([]);

  const enID = language === "en" ? "gas-3" : "";

  const text = {
    ka: {
      title:
        "ელექტროენერგიის და თბოენერგიის საბოლოო მოხმარება სექტორების მიხედვით",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final consumption of Electricity and heat by sectors",
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
        (el) => el.name === 1 && el.name_ge !== "სულ"
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
        <div className="main-chart chart-5">
          <div className="header-container">
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

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={350}>
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

export default Chart_5;
