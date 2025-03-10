/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";

const Chart_2 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);

  const text = {
    ka: {
      title: "საერთაშორისო ვაჭრობა",
      unit: "ათასი ტნე",
    },
    en: {
      title: "International trade",
      unit: "Thousand tons",
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
      try {
        const response = await fetch(
          "http://192.168.1.27:3000/api/resourceswithcodes/8"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rawData = await response.json();

        const transformedData = years.map((year) => ({
          year: year.replace("y_", ""),
          imports: rawData[0][year],
          exports: rawData[1][year],
          name_ge: rawData[0].name_ge,
          name_en: rawData[0].name_en,
          export_name_ge: rawData[1].name_ge,
          export_name_en: rawData[1].name_en,
        }));

        setData(transformedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [years]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName =
              name === "imports"
                ? language === "en"
                  ? payload[index].payload.name_en
                  : payload[index].payload.name_ge
                : language === "en"
                ? payload[index].payload.export_name_en
                : payload[index].payload.export_name_ge;

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
      <div className="legend-container">
        {payload.map((entry, index) => {
          const displayName =
            entry.dataKey === "imports"
              ? language === "en"
                ? data[0].name_en
                : data[0].name_ge
              : language === "en"
              ? data[1].export_name_en
              : data[1].export_name_ge;

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

  const CustomBrushHandle = (props) => {
    const { x, y, width, height, stroke, fill } = props;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="#115EFE"
        fill={fill}
        style={{ cursor: "pointer" }} // Optional: Change cursor style
      />
    );
  };

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart">
          <div className="header-container">
            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={600}>
            <LineChart data={data}>
              <XAxis dataKey="year" tickLine={false} />
              <YAxis tickLine={false} padding={{ top: 30, bottom: 10 }} />
              <Tooltip content={CustomTooltip} />
              <Legend content={<CustomLegend />} />
              <Line
                dataKey="imports"
                stroke="#30B0C7"
                strokeWidth={3}
                dot={false}
              />
              <Line
                dataKey="exports"
                stroke="#FB3B52"
                strokeWidth={3}
                dot={false}
              />
              {/* <Brush
                height={20}
                stroke="#115EFE"
                fill="#115EFE" // Background color of the brush area
                margin={{ top: 10, bottom: 10 }} // Adjust margins
                handle={<CustomBrushHandle />} // Optional: Custom handle component
                dataKey="year"
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_2;
