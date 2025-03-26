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

const Chart_3 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const chartID = 19;

  const text = {
    ka: {
      title: "ქვანახშირის საბოლოო მოხმარება სექტორების მიხედვით",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Final coal consumption by sector",
      unit: "ktoe",
    },
  };

  const years = useMemo(
    () => Array.from({ length: 11 }, (_, i) => `y_20${i + 13}`),
    []
  );

  const colorMap = useMemo(
    () => ({
      მრეწველობა: "#5654D4",
      "კერძო და სახელმწიფო მომსახურება": "#3FC8E4",
      შინამეურნეობები: "#007C90",
      "სოფლის, სატყეო და თევზის მეურნეობა": "#ED4C5C",
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);

        const filteredData = rawData.filter((item) => item.name_ge !== "სულ");

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
        style={{ marginTop: language === "en" ? "-40px" : "-80px" }}>
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
        <div className="main-chart chart-3">
          <div className="header-container">
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
                  barSize={30}
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

export default Chart_3;
