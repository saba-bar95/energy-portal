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

const SecondChart = ({ data }) => {
  const { language } = useParams();

  const CustomLegend = () => {
    return (
      <div className="legend-container">
        <p>
          <span style={{ color: data.color[0] }}>■</span>
          სულ
        </p>
        <p>
          <span style={{ color: data.color[1] }}>■</span>
          ქალაქად
        </p>
        <p>
          <span style={{ color: data.color[2] }}>■</span>
          სოფლად
        </p>
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
              <span style={{ color }} className="before-span">
                ■
              </span>
              {language === "en"
                ? capitalizeFirstLetter(name)
                : getGeorgianName(name)}{" "}
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
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#1E1E1E">
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
    <div style={{ width: "100%", height: "100%" }} className="main-chart">
      <div className="header-container">
        <img src={data.icon} alt="" />
        <div className="text-wrapper">
          <h2>{data[`title_${language}`]}</h2>
          <h3>{data[`unit_${language}`]}</h3>
        </div>
        <Download />
      </div>

      <ResponsiveContainer height={600}>
        <BarChart
          width={500}
          height={300}
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis
            dataKey="name_ge"
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
          <Legend content={CustomLegend} />
          <Bar dataKey="total" fill={data.color[0]} minPointSize={5} />
          <Bar dataKey="city" fill={data.color[1]} minPointSize={10} />
          <Bar dataKey="village" fill={data.color[2]} minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecondChart;
