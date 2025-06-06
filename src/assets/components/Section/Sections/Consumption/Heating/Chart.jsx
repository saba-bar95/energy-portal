/* eslint-disable react/prop-types */
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../Download/Download";
import { useState, useEffect } from "react";

const Chart = ({ data }) => {
  const { language } = useParams();
  const sortedData = data.data.sort((a, b) => b.total - a.total);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeKeys, setActiveKeys] = useState({
    total: true,
    city: true,
    village: true,
  });

  const toggleBar = (key) => {
    const activeCount = Object.values(activeKeys).filter(Boolean).length;

    // Prevent hiding the last visible bar
    if (activeCount > 1 || !activeKeys[key]) {
      setActiveKeys((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  useEffect(() => {
    setActiveKeys({
      total: true,
      city: true,
      village: true,
    });
  }, [language]);

  const barSize =
    data.householdID === 100
      ? windowWidth < 1200
        ? 12
        : 15
      : windowWidth < 1200
      ? 18
      : 24;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomLegend = () => {
    const legendItems = [
      {
        name: "total",
        label: language === "ge" ? "სულ" : "Total",
        color: data.color[0],
      },
      {
        name: "city",
        label: language === "ge" ? "ქალაქად" : "Urban",
        color: data.color[1],
      },
      {
        name: "village",
        label: language === "ge" ? "სოფლად" : "Rural",
        color: data.color[2],
      },
    ];

    return (
      <div className="legend-container">
        {legendItems.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{
              opacity: activeKeys[entry.name] ? 1 : 0.5,
              cursor: "pointer",
            }}
            onClick={() => toggleBar(entry.name)}>
            <span style={{ color: entry.color }}>■</span>
            {entry.label}
          </p>
        ))}
      </div>
    );
  };

  const CustomLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x + 5} y={y - 10} className="text text-1">
        {value}
      </text>
    );
  };

  const getGeorgianName = (entry) => {
    const nameMap = {
      total: "სულ",
      village: "სოფლად",
      city: "ქალაქად",
    };
    return nameMap[entry.toLowerCase()] || entry;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => (
            <p key={`item-${index}`} className="text">
              <span style={{ color }} className="before-span"></span>
              {language === "en"
                ? name === "City"
                  ? "Urban"
                  : name === "Village"
                  ? "Rural"
                  : name
                : getGeorgianName(name)}
              :
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {value.toFixed(1)}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  };

  const unit = "%";
  const firstActiveKey =
    Object.keys(activeKeys).find((key) => activeKeys[key]) || "total";

  return (
    <div style={{ width: "100%" }} className="main-chart">
      <div className="header-container">
        <img src={data.icon} alt="" />
        <div className="text-wrapper">
          <h2>{data[`title_${language}`]}</h2>
          <h3>{unit}</h3>
        </div>
        <Download
          resource="resource"
          data={sortedData}
          filename={data[`title_${language}`]}
          unit={unit}
          year={2022}
        />
      </div>
      <ResponsiveContainer
        height={windowWidth < 768 ? 450 : windowWidth < 1200 ? 500 : 580}>
        <BarChart data={sortedData} layout="vertical" height={500} barGap={1}>
          <XAxis
            type="number"
            tickLine={false}
            tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
          />
          <YAxis
            dataKey={language === "ge" ? "name_ge" : "name_en"}
            type="category"
            tick={false}
            padding={{ top: 30 }}
          />
          <Tooltip content={CustomTooltip} />
          {windowWidth >= 820 && <Legend content={CustomLegend} />}
          {activeKeys.total && (
            <Bar
              dataKey="total"
              fill={data.color[0]}
              name="Total"
              barSize={barSize}
              minPointSize={1}>
              {firstActiveKey === "total" && (
                <LabelList
                  dataKey={language === "ge" ? "name_ge" : "name_en"}
                  content={CustomLabel}
                />
              )}
            </Bar>
          )}

          {activeKeys.city && (
            <Bar
              dataKey="city"
              fill={data.color[1]}
              name="City"
              barSize={barSize}
              minPointSize={1}>
              {firstActiveKey === "city" && (
                <LabelList
                  dataKey={language === "ge" ? "name_ge" : "name_en"}
                  content={CustomLabel}
                />
              )}
            </Bar>
          )}

          {activeKeys.village && (
            <Bar
              dataKey="village"
              fill={data.color[2]}
              name="Village"
              barSize={barSize}
              minPointSize={1}>
              {firstActiveKey === "village" && (
                <LabelList
                  dataKey={language === "ge" ? "name_ge" : "name_en"}
                  content={CustomLabel}
                />
              )}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
