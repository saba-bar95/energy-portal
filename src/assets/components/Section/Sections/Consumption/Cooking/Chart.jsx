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
import "./Cooking.scss";

const Chart = ({ data }) => {
  const barSize =
    data.householdID === 104 || data.householdID === 105 ? 18 : 24;

  const { language } = useParams();

  const sortedData = data.data.sort((a, b) => {
    const isAOther = a.name_en.includes("Other") || a.name_ge.includes("სხვა");
    const isBOther = b.name_en.includes("Other") || b.name_ge.includes("სხვა");

    if (isAOther && !isBOther) {
      return 1; // Move "Other" or "სხვა" to the end
    }
    if (!isAOther && isBOther) {
      return -1; // Keep non-"Other" entries at the top
    }
    return b.total - a.total; // Sort normally otherwise
  });

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

  const CustomLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x + 5} y={y - 10} className="text">
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
              <span style={{ color }} className="before-span">
                ■
              </span>
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
          data={data.data}
          filename={data[`title_${language}`]}
          unit={unit}
          year={2022}
        />
      </div>
      <ResponsiveContainer height={580}>
        <BarChart data={sortedData} layout="vertical" height={500} barGap={0}>
          <XAxis type="number" tickLine={false} />
          <YAxis
            dataKey={language === "ge" ? "name_ge" : "name_en"}
            type="category"
            tick={false}
            padding={{ top: 30 }}
          />
          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
          <Bar
            dataKey="total"
            fill={data.color[0]}
            name="Total"
            barSize={barSize}
            minPointSize={1}>
            <LabelList
              dataKey={language === "ge" ? "name_ge" : "name_en"}
              content={CustomLabel}
            />
          </Bar>
          <Bar
            dataKey="city"
            fill={data.color[1]}
            name="City"
            barSize={barSize}
            minPointSize={1}
          />
          <Bar
            dataKey="village"
            fill={data.color[2]}
            name="Village"
            barSize={barSize}
            minPointSize={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
