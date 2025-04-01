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
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_2 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const chartID = 7;
  const chartName = 5;

  const text = {
    ka: {
      title: "ბიოსაწვავის და ნარჩენების საბოლოო მოხმარება სახეების მიხედვით",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Final consumption of biofuels and waste by type",
      unit: "ktoe",
    },
  };

  const years = useMemo(
    () => Array.from({ length: 11 }, (_, i) => `y_20${i + 13}`),
    []
  );

  const colorMap = useMemo(
    () => ({
      შეშა: "#5654D4",
      "სხვა მცენარეული მასალები და ნარჩენები": "#007C90",
      ბიოდიზელი: "#FF9F0A",
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);

        const filteredData = rawData.filter(
          (item) => item.name_ge !== "სულ" && item.name === chartName
        );

        // Extract unique categories from the filtered data
        const uniqueCategories = filteredData.map((item) => ({
          key_ge: item.name_ge,
          key_en: item.name_en,
          color: colorMap[item.name_ge] || "#000000", // Fallback color if not found
        }));

        setCategories(uniqueCategories);

        const stackedData = years.map((year) => {
          const yearData = { year: year.replace("y_", "") };
          filteredData.forEach((item) => {
            yearData[item.name_ge] = item[year] || 0; // Georgian key
            yearData[item.name_en] = item[year] || 0; // English key
          });
          return yearData;
        });

        setData(stackedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [years, colorMap]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName = name;
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
        className="legend-container"
        id="coal-chart-5"
        style={{ marginTop: language === "en" ? "0px" : "0px" }}>
        {" "}
        {/* Corrected here */}
        {payload.map((entry, index) => {
          const displayName = language === "ka" ? entry.dataKey : entry.dataKey;
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

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart ">
          <div className="header-container">
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.8667 6.93333C13.8667 3.11133 10.7553 0 6.93333 0C3.11133 0 0 3.11133 0 6.93333C0 10.7553 3.11133 13.8667 6.93333 13.8667C10.7553 13.8667 13.8667 10.7553 13.8667 6.93333ZM1.73333 6.93333C1.73333 4.06467 4.06467 1.73333 6.93333 1.73333C9.802 1.73333 12.1333 4.06467 12.1333 6.93333C12.1333 9.802 9.802 12.1333 6.93333 12.1333C4.06467 12.1333 1.73333 9.802 1.73333 6.93333Z"
                fill="black"
              />
              <path
                d="M9.88934 6.57783C9.75067 6.26583 9.43867 6.06649 9.10067 6.06649H6.57001L8.04334 4.22049C8.338 3.84783 8.27734 3.30183 7.90467 2.99849C7.53201 2.70383 6.98601 2.76449 6.68267 3.13716L4.09134 6.38716C3.88334 6.64716 3.84001 7.00249 3.98734 7.30582C4.13467 7.60916 4.43801 7.79982 4.76734 7.79982H7.18534L5.59067 9.61116C5.27001 9.97516 5.31334 10.5212 5.66867 10.8332C5.83334 10.9805 6.04134 11.0498 6.24067 11.0498C6.48334 11.0498 6.71734 10.9458 6.89067 10.7552L9.742 7.50516C9.96734 7.25382 10.0193 6.88982 9.88067 6.57783H9.88934Z"
                fill="black"
              />
              <path
                d="M25.1333 24.2667H24.076L23.6166 22.438C23.374 21.476 22.5073 20.8 21.5193 20.8H19.9333V18.98C20.2886 19.0667 20.6526 19.11 21.0166 19.11C22.0393 19.11 23.0446 18.772 23.9113 18.1047C25.402 16.952 26.1906 14.9847 25.974 12.9827C25.9393 12.7053 25.7833 12.4627 25.5406 12.324C23.842 11.3707 21.84 11.518 20.306 12.7053C19.812 13.0867 19.4046 13.5633 19.0753 14.092C18.746 13.5633 18.3386 13.0867 17.8446 12.7053C16.3106 11.518 14.3086 11.3707 12.61 12.324C12.3673 12.4627 12.2026 12.7053 12.1766 12.9827C11.9513 14.9847 12.74 16.952 14.2393 18.1047C15.0973 18.772 16.1113 19.11 17.134 19.11C17.498 19.11 17.8533 19.058 18.2173 18.98V20.8H16.6313C15.6346 20.8 14.768 21.476 14.534 22.438L14.0746 24.2667H8.68398C8.20732 24.2667 7.81732 23.8767 7.81732 23.4V15.6C7.81732 15.1233 7.42732 14.7333 6.95065 14.7333C6.47398 14.7333 6.08398 15.1233 6.08398 15.6V23.4C6.08398 24.83 7.25398 26 8.68398 26H25.1506C25.6273 26 26.0173 25.61 26.0173 25.1333C26.0173 24.6567 25.6273 24.2667 25.1506 24.2667H25.1333ZM21.3546 14.0747C22.204 13.416 23.2873 13.26 24.2666 13.6413C24.2666 14.8807 23.7466 16.0333 22.8453 16.7353C21.996 17.394 20.9126 17.55 19.9333 17.1687C19.9333 15.9293 20.4533 14.7767 21.3546 14.0747ZM15.288 16.7353C14.3866 16.0333 13.858 14.8807 13.8666 13.6413C14.846 13.26 15.9293 13.416 16.7786 14.0747C17.68 14.7767 18.2086 15.9293 18.2 17.1687C17.2206 17.5413 16.1373 17.394 15.288 16.7353ZM16.1893 22.8627C16.2413 22.672 16.4146 22.5333 16.614 22.5333H21.5193C21.7186 22.5333 21.892 22.672 21.944 22.8627L22.2993 24.2667H15.8513L16.2066 22.8627H16.1893Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="year"
                tickLine={false}
                padding={{ right: 15, left: 15 }}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend content={CustomLegend} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {categories.map((category, i) => (
                <Bar
                  key={i}
                  dataKey={
                    language === "en" ? category.key_en : category.key_ge
                  } // Use the appropriate key based on the language
                  fill={category.color}
                  stackId={1}
                  minPointSize={4}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_2;
