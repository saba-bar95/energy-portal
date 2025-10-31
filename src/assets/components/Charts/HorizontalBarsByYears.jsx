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
import { useParams } from "react-router-dom";
import fetchDataWithCodes from "../../fetchFunctions/fetchDataWithCodes";

const HorizontalBarsByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        // Extract available years dynamically from the data
        const yearKeys = Object.keys(rawData[0]).filter((key) =>
          key.startsWith("y_")
        );
        const extractedYears = yearKeys
          .map((key) => parseInt(key.replace("y_", "")))
          .filter((year) => !isNaN(year))
          .sort((a, b) => a - b);

        setAvailableYears(extractedYears);

        // Set initial year to the most recent one if not already set
        if (!year && extractedYears.length > 0) {
          setYear(extractedYears[extractedYears.length - 1]);
        }

        const chartData = () => {
          if (!year || extractedYears.length === 0) return [];

          return filteredData
            .map((item) => ({
              name: item[`name_${language}`],
              value: item[`y_${year}`] || 0,
            }))
            .filter((item) => item.value !== undefined && item.value !== null) // Filter out undefined/null values
            .sort((a, b) => {
              const aContainsOther =
                a.name.includes("სხვა") || a.name.includes("Other");
              const bContainsOther =
                b.name.includes("სხვა") || b.name.includes("Other");

              // Ensure "Other"/"სხვა" is placed at the end
              if (aContainsOther) return 1;
              if (bContainsOther) return -1;

              // If neither contains "Other"/"სხვა", sort by value in descending order
              return b.value - a.value;
            });
        };

        setData(chartData());
      } catch (error) {
        console.log("Fetch error:", error);
        setAvailableYears([]);
        setData([]);
      }
    };
    fetchData();
  }, [info.chartID, info.chartName, year, language]);

  const customNameLabel = (props) => {
    const { x, y, value } = props;
    const fontSize =
      windowWidth < 768
        ? 11
        : windowWidth < 1200
        ? 13
        : windowWidth < 1600
        ? 14
        : 16; // Adjust font size based on window width

    return (
      <text x={x + 5} y={y - 10} fontSize={fontSize}>
        {value}
      </text>
    );
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const rectWidth = 50; // Width of the rectangle
    const rectHeight =
      windowWidth < 768
        ? 18
        : windowWidth < 1200
        ? 20
        : windowWidth < 1600
        ? 23
        : 25; // Set this to match the barSize

    const fontSize =
      windowWidth < 768
        ? 11
        : windowWidth < 1200
        ? 13
        : windowWidth < 1600
        ? 14
        : 16; // Adjust font size based on window width

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
          fontSize={fontSize}
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
                <span style={{ color }} className="before-span"></span>
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
      {data.length > 0 && availableYears.length > 0 && (
        <div className="main-chart" id={info?.id}>
          <div className="header-container">
            {info.svg}
            <div className="text-wrapper">
              <h2>{info[`title_${language}`]}</h2>
              <h3>{info[`unit_${language}`]}</h3>
            </div>
            <div className="years-wrapper">
              <YearDropdown
                years={availableYears}
                year={year}
                setYear={setYear}
              />
              <Download
                data={data}
                filename={info[`title_${language}`]}
                unit={info[`unit_${language}`]}
                year={year}
              />
            </div>
          </div>
          <ResponsiveContainer
            height={
              windowWidth < 768
                ? info?.mobileHeight
                : info?.height
                ? info.height
                : "100%"
            }>
            <BarChart
              data={data}
              layout="vertical" // Set layout to vertical for horizontal bars
              margin={
                windowWidth < 768
                  ? { top: 15, right: 5, left: -30, bottom: 5 }
                  : { top: 20, right: 30, left: 20, bottom: 5 }
              }>
              <XAxis
                type="number"
                tickLine={false}
                tick={{
                  style: {
                    fontSize:
                      windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
                  },
                }}
              />
              <YAxis
                dataKey={"name"}
                type="category"
                tick={false}
                padding={{ top: 15, bottom: 10 }}
                axisLine={false}
              />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Tooltip content={CustomTooltip} />
              <Bar
                dataKey="value"
                fill={info.color}
                barSize={windowWidth < 768 ? 18 : 25}>
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
