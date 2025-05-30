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
import { useEffect, useState } from "react";

const Chart = ({ data }) => {
  // const barSize = data.householdID === 100 ? 15 : 24;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const barSize =
    data.householdID === 100
      ? windowWidth < 1200
        ? 11
        : 15
      : windowWidth < 1200
      ? 18
      : 24;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { language } = useParams();
  const sortedData = data.data.sort((a, b) => b.total - a.total);

  const CustomLegend = () => {
    return (
      <div className="legend-container">
        <p>
          <span style={{ color: data.color[0] }}></span>
          {language === "ge" ? "სულ" : "Total"}
        </p>
        <p>
          <span style={{ color: data.color[1] }}></span>
          {language === "ge" ? "ქალაქად" : "Urban"}
        </p>
        <p>
          <span style={{ color: data.color[2] }}></span>
          {language === "ge" ? "სოფლად" : "Rural"}
        </p>
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

  return (
    <div className="main-chart hot-water-chart">
      <div className="header-container">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.993 9.38737L18.7394 18.1609C18.5894 19.2095 17.678 20.0002 16.6187 20.0002H3.38154C2.32225 20.0002 1.41011 19.2095 1.26011 18.1609L0.00725019 9.38737C-0.0484641 8.99666 0.222964 8.63523 0.613679 8.57952C1.00439 8.5238 1.36654 8.79523 1.42225 9.18523L1.84011 12.1109C2.61868 11.9852 2.87082 11.4288 4.28582 11.4288C4.71368 11.4288 5.08082 11.4831 5.40939 11.5952C5.78225 11.7231 5.98225 12.1288 5.85439 12.5024C5.72653 12.8759 5.32153 13.0774 4.94725 12.9474C4.77082 12.8867 4.55368 12.8574 4.28582 12.8574C3.29154 12.8574 3.09939 13.3645 2.04225 13.5267L2.67582 17.9588C2.72439 18.3081 3.02868 18.5717 3.38154 18.5717H16.618C16.9708 18.5717 17.2751 18.3081 17.3244 17.9588L17.958 13.5267C16.8922 13.3631 16.7001 12.8574 15.7144 12.8574C15.4465 12.8574 15.2294 12.8867 15.0522 12.9474C14.6787 13.0731 14.273 12.8752 14.1451 12.5024C14.0172 12.1295 14.2172 11.7231 14.5901 11.5952C14.9194 11.4831 15.2865 11.4288 15.7144 11.4288C17.1301 11.4288 17.3601 11.9817 18.1601 12.1109L18.578 9.18523C18.6337 8.79523 18.998 8.52666 19.3865 8.57952C19.7772 8.63452 20.0487 8.99666 19.993 9.38737Z"
            fill="black"
          />
          <path
            d="M9.99919 0C8.81776 0 7.85634 0.961428 7.85634 2.14286V10.7286C6.71419 11.585 6.18776 13.0336 6.53562 14.4586C7.15134 16.9729 10.2035 17.9693 12.2185 16.3707C13.0785 15.6871 13.5706 14.6671 13.5706 13.5714C13.5706 12.455 13.032 11.4 12.142 10.7293V2.14286C12.142 0.961428 11.1806 0 9.99919 0ZM11.3299 15.2514C10.1113 16.22 8.28491 15.5957 7.92348 14.1193C7.68848 13.1586 8.08348 12.2207 8.92919 11.7279C9.14991 11.6 9.28491 11.365 9.28491 11.1107V2.14286C9.28491 1.74929 9.60491 1.42857 9.99919 1.42857C10.3935 1.42857 10.7135 1.74929 10.7135 2.14286V11.1107C10.7135 11.3643 10.8485 11.6 11.0685 11.7279C11.7406 12.1193 12.142 12.8086 12.142 13.5714C12.142 14.2293 11.8463 14.8407 11.3299 15.2514Z"
            fill="black"
          />
          <path
            d="M10.7137 12.8574V13.5716C10.7137 13.9666 10.3944 14.2859 9.99944 14.2859C9.60444 14.2859 9.28516 13.9666 9.28516 13.5716V12.8574C9.28516 12.4624 9.60444 12.1431 9.99944 12.1431C10.3944 12.1431 10.7137 12.4624 10.7137 12.8574Z"
            fill="black"
          />
          <path
            d="M12.8555 1.42864C12.8555 1.03436 13.1748 0.714355 13.5698 0.714355H14.9983C15.3933 0.714355 15.7126 1.03436 15.7126 1.42864C15.7126 1.82293 15.3933 2.14293 14.9983 2.14293H13.5698C13.1748 2.14293 12.8555 1.82293 12.8555 1.42864Z"
            fill="black"
          />
          <path
            d="M12.8555 3.57122C12.8555 3.17693 13.1748 2.85693 13.5698 2.85693H14.284C14.679 2.85693 14.9983 3.17693 14.9983 3.57122C14.9983 3.9655 14.679 4.2855 14.284 4.2855H13.5698C13.1748 4.2855 12.8555 3.9655 12.8555 3.57122Z"
            fill="black"
          />
          <path
            d="M12.8555 5.71429C12.8555 5.32 13.1748 5 13.5698 5H14.9983C15.3933 5 15.7126 5.32 15.7126 5.71429C15.7126 6.10857 15.3933 6.42857 14.9983 6.42857H13.5698C13.1748 6.42857 12.8555 6.10857 12.8555 5.71429Z"
            fill="black"
          />
        </svg>
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
      <ResponsiveContainer
        height={windowWidth < 768 ? 450 : windowWidth < 1200 ? 500 : 580}>
        <BarChart data={sortedData} layout="vertical" height={500} barGap={0}>
          <XAxis
            type="number"
            ticks={[0, 20, 40, 60, 80, 100]}
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
