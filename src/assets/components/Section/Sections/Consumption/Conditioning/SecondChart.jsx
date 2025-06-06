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
import { useEffect, useState } from "react";

const SecondChart = ({ data }) => {
  const { language } = useParams();

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

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => (
            <p key={`item-${index}`} className="text">
              <span style={{ color }} className="before-span"></span>
              {language === "en"
                ? capitalizeFirstLetter(
                    name === "city"
                      ? "Urban"
                      : name === "village"
                      ? "Rural"
                      : name
                  )
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

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <text
        x={x}
        y={y}
        dy={16}
        textAnchor="middle"
        fill="#1E1E1E"
        fontSize={14}>
        {payload.value}
      </text>
    );
  };

  const CustomYAxis = ({ x, y, payload }) => {
    const formattedValue =
      payload.value === 0 ? "0.0" : payload.value.toFixed(1); // Format the value

    return (
      <text
        x={x}
        y={y}
        dy={5}
        dx={-20}
        textAnchor="middle"
        fill="#A0A0A0"
        fontSize="14" // Font size
        fontFamily="Arial, sans-serif">
        {formattedValue} {payload.value > 0 && data[`chart_unit_${language}`]}
      </text>
    );
  };

  return (
    <div style={{ width: "100%" }} className="main-chart second-chart">
      <div className="header-container">
        <img src={data.icon} alt="" />
        <div className="text-wrapper">
          <h2>{data[`title_${language}`]}</h2>
          <h3>{data[`unit_${language}`]}</h3>
        </div>
        <Download
          resource="resource"
          data={data.data}
          filename={data[`title_${language}`]}
          unit={data[`unit_${language}`]}
          year={2022}
        />
      </div>

      <ResponsiveContainer
        height={windowWidth < 768 ? 400 : windowWidth < 1200 ? 500 : 600}>
        <BarChart
          width={500}
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis
            dataKey={language === "ge" ? "name_ge" : "name_en"}
            tickLine={false}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            tick={<CustomYAxis />}
            tickLine={false}
            domain={[0, 6]}
            padding={{ top: 15 }}
          />
          <Tooltip content={CustomTooltip} />

          {windowWidth >= 820 && <Legend content={CustomLegend} />}
          {activeKeys.total && (
            <Bar dataKey="total" fill={data.color[0]} minPointSize={5} />
          )}

          {activeKeys.city && (
            <Bar dataKey="city" fill={data.color[1]} minPointSize={10} />
          )}

          {activeKeys.village && (
            <Bar dataKey="village" fill={data.color[2]} minPointSize={10} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecondChart;
