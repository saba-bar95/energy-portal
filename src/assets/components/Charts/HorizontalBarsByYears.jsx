/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";
import Download from "../Download/Download";
import YearDropdown from "../YearDropdown/YearDropdown";
import fetchDataWithCodes from "../../../../fetchDataWithCodes";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";

const HorizontalBarsByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2023);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(info.chartID);

        const filteredData = rawData.filter(
          (item) =>
            item.name === info.chartName &&
            item.chart_id === info.chartID &&
            item.name_ge !== "სულ"
        );
        const chartData = () => {
          return filteredData
            .map((item) => ({
              name: item[`name_${language}`],
              value: item[`y_${year}`],
            }))
            .sort((a, b) => {
              const aContainsOther =
                a.name.includes("სხვა") || a.name.includes("Other");
              const bContainsOther =
                b.name.includes("სხვა") || b.name.includes("Other");

              // Ensure "Other"/"სხვა" is placed at the end
              if (aContainsOther) return 1;
              if (bContainsOther) return -1;

              // If neither contains "Other"/"სხვა", sort by value in ascending order
              return b.value - a.value;
            });
        };

        setData(chartData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [info.chartID, info.chartName, year, language]);

  const customNameLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x + 5} y={y - 10}>
        {value}
      </text>
    );
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const rectWidth = 50; // Width of the rectangle
    const rectHeight = 25; // Set this to match the barSize

    return (
      <g>
        <rect
          x={x + width + 10} // Positioning the rectangle to the right of the bar
          y={y} // Align the rectangle with the bar
          width={rectWidth}
          height={rectHeight}
          fill="#EFEFEF" // Rectangle color
          rx={5} // Rounded corners
        />
        <text
          x={x + width + 10 + rectWidth / 2} // Center the text inside the rectangle
          y={y + rectHeight / 2} // Align the text vertically in the middle of the rectangle
          fill="#1E1E1E" // Text color
          textAnchor="middle"
          dominantBaseline="middle">
          {value.toFixed(1)}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ value, color }, index) => {
            const displayName = payload[0].payload.name;
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

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart">
          <div className="header-container">
            {info.svg}
            <div className="text-wrapper">
              <h2>{info[`title_${language}`]}</h2>
              <h3>{info[`unit_${language}`]}</h3>
            </div>
            <div className="years-wrapper">
              <YearDropdown years={chartYears} year={year} setYear={setYear} />
              <Download
                data={data}
                filename={info[`title_${language}`]}
                unit={info[`unit_${language}`]}
                year={year}
              />
            </div>
          </div>
          <ResponsiveContainer height={info.height ? info.height : "100%"}>
            <BarChart
              data={data}
              layout="vertical" // Set layout to vertical for horizontal bars
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <XAxis type="number" tickLine={false} />
              <YAxis
                dataKey={"name"}
                type="category"
                tick={false}
                padding={{ top: 30, bottom: 20 }}
                axisLine={false}
              />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" fill={info.color} barSize={25}>
                <LabelList dataKey={"name"} content={customNameLabel} />
                <LabelList dataKey="value" content={renderCustomizedLabel} />
                {/* Labels on top of bars */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default HorizontalBarsByYears;
