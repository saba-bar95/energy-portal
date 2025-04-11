/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
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

          {language === "ge" ? "სულ" : "Total"}
        </p>
        <p>
          <span style={{ color: data.color[1] }}>■</span>
          {language === "ge" ? "ქალაქად" : "Urban"}
        </p>
        <p>
          <span style={{ color: data.color[2] }}>■</span>
          {language === "ge" ? "სოფლად" : "Rural"}
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

    const originalValues = payload[0].payload.originalValues;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, color }, index) => (
            <p key={`item-${index}`} className="text">
              <span style={{ color }} className="before-span">
                ■
              </span>
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
                {originalValues[name].toFixed(1)} {/* Use original values */}
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

  const normalizedData = data.data.map((item) => {
    const total = item.total + item.city + item.village;
    return {
      name_en: item.name_en, // Include name_en for English
      name_ge: item.name_ge,
      total: (item.total / total) * 100,
      city: (item.city / total) * 100,
      village: (item.village / total) * 100,
      originalValues: {
        // Store original values for tooltip
        total: item.total,
        city: item.city,
        village: item.village,
      },
    };
  });

  const CustomLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x + 5} y={y - 10}>
        {value}
      </text>
    );
  };

  return (
    <div style={{ width: "100%" }} className="main-chart">
      <div className="header-container">
        <img src={data.icon} alt="" />
        <div className="text-wrapper">
          <h2>{data[`title_${language}`]}</h2>
          <h3>{data[`unit_${language}`]}</h3>
        </div>
        <Download
          resource="resource"
          data={normalizedData}
          filename={data[`title_${language}`]}
          unit={data[`unit_${language}`]}
          year={2022}
        />
      </div>

      <ResponsiveContainer height={600}>
        <BarChart
          layout="vertical"
          width={500}
          height={300}
          data={normalizedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
          <XAxis
            type="number"
            tickLine={false}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(value) => Math.round(value)} // Round the value to the nearest whole number
            tick={<CustomXAxisTick />}
          />
          <YAxis
            type="category"
            dataKey="name_ge"
            tick={false}
            padding={{ top: 15 }}
            reversed={true}
          />
          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
          <Bar dataKey="total" stackId="a" fill={data.color[0]} barSize={25}>
            <LabelList
              dataKey={language === "en" ? "name_en" : "name_ge"}
              content={CustomLabel}
            />
          </Bar>
          <Bar dataKey="city" stackId="a" fill={data.color[1]} />
          <Bar dataKey="village" stackId="a" fill={data.color[2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecondChart;
