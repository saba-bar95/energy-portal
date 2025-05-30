/* eslint-disable react/prop-types */
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
import "./Chart.scss";
import Download from "../../../../Download/Download";
import { useState, useEffect } from "react";

const SecondChart = ({ data }) => {
  const { language } = useParams();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to translate categories if language is Georgian
  const getGeorgianName = (entry) => {
    const nameMap = {
      total: "სულ",
      village: "სოფლად",
      city: "ქალაქად",
    };
    return nameMap[entry.toLowerCase()] || entry;
  };

  // Transform data to have 3 bars (Total, City, Village) with 7 categories
  const transformedData = [
    {
      category: language === "ge" ? "სულ" : "Total",
      ...Object.fromEntries(
        data.data.map((entry) => [entry[`name_${language}`], entry.total])
      ),
    },
    {
      category: language === "ge" ? "ქალაქად" : "Urban",
      ...Object.fromEntries(
        data.data.map((entry) => [entry[`name_${language}`], entry.city])
      ),
    },
    {
      category: language === "ge" ? "სოფლად" : "Rural",
      ...Object.fromEntries(
        data.data.map((entry) => [entry[`name_${language}`], entry.village])
      ),
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => (
            <p key={`item-${index}`} className="text">
              <span style={{ color }} className="before-span"></span>
              {language === "ge" ? getGeorgianName(name) : name}:
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {value.toFixed(1)}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  };

  const styles = {
    flexWrap: "wrap",
    gap: "20px",
    marginTop: language === "en" ? "-30px" : "-30px",
    marginLeft: "60px",
    justifyContent: "start",
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="legend-container" style={styles}>
        {payload.map((entry, index) => {
          const displayName = entry.dataKey; // Fallback to the original dataKey if no match
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

  const classN =
    language === "en" ? "main-chart first-chart-en" : "main-chart first-chart";

  return (
    <div style={{ width: "100%" }} className={classN}>
      <div className="header-container">
        <img src={data.icon} alt="" />
        <div className="text-wrapper">
          <h2>{data[`title_${language}`]}</h2>
          <h3>{data[`unit_${language}`]}</h3>
        </div>
        <Download
          resource="resource"
          data={transformedData}
          filename={data[`title_${language}`]}
          unit={data[`unit_${language}`]}
          year={2022}
          isConditioning={true}
        />
      </div>

      <ResponsiveContainer
        height={windowWidth < 768 ? 400 : windowWidth < 1200 ? 500 : 600}>
        <BarChart
          layout="horizontal" // ✅ Set layout to horizontal
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            type="category"
            dataKey="category"
            tickLine={false}
            tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
          />
          <YAxis
            tickLine={false}
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => Math.round(value)}
            tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
          />
          <Tooltip content={CustomTooltip} />

          {windowWidth >= 820 && <Legend content={CustomLegend} />}
          {data.data.map((entry, index) => (
            <Bar
              key={index}
              dataKey={entry[`name_${language}`]}
              stackId="a"
              fill={data.color[index]}
              maxBarSize={80}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecondChart;
