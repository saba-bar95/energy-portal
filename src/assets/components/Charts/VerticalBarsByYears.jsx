/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Brush,
} from "recharts";
import Download from "../Download/Download";
import fetchDataWithCodes from "../../../../fetchDataWithCodes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";

const VerticalBarsByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hiddenBars, setHiddenBars] = useState(new Set());

  const toggleBarVisibility = (key) => {
    setHiddenBars((prev) => {
      const newSet = new Set(prev);

      // Ensure at least one bar remains visible
      if (newSet.size === dataKeys.length - 1 && !newSet.has(key)) {
        return prev;
      }

      // Toggle visibility
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }

      return newSet;
    });
  };

  const id = language === "en" ? `${info.id}-${language}` : info.id;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(info.chartID);

        // Filter Data and Modify "სხვა ბიტუმოვანი"
        let filteredData = rawData
          .filter(
            (item) =>
              item.name === info.chartName &&
              item.chart_id === info.chartID &&
              item.name_ge !== "სულ"
          )
          .map((item) => ({
            ...item,
            name_ge:
              item.name_ge === "სხვა ბიტუმოვანი"
                ? "სხვა ბიტუმოვანი ქვანახშირი"
                : item.name_ge,
          }));

        // Sort filteredData so "Other" or "სხვა" always appears last
        filteredData = filteredData.sort((a, b) => {
          const aContainsOther =
            a.name_ge.includes("სხვა") || a.name_en.includes("Other");
          const bContainsOther =
            b.name_ge.includes("სხვა") || b.name_en.includes("Other");

          // Ensure "Other"/"სხვა" goes last
          if (aContainsOther) return 1;
          if (bContainsOther) return -1;

          // If neither contains "Other"/"სხვა", sort by value in ascending order
          return (
            b[`y_${chartYears[chartYears.length - 1]}`] -
            a[`y_${chartYears[chartYears.length - 1]}`]
          );
        });

        // Extract unique data keys
        const newDataKeys = [];
        filteredData.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            newDataKeys.push(name);
          }
        });

        setDataKeys(newDataKeys);

        // Create stacked data grouped by years
        const stackedData = chartYears.map((year) => {
          const yearData = { year: year };

          filteredData.forEach((item) => {
            yearData[item[`name_${language}`]] = item[`y_${year}`];
          });

          return yearData;
        });

        setData(stackedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, [language, info.chartID, info.chartName]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName = name;
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

  const CustomLegend = () => {
    return (
      <div className="legend-container" style={info?.styles}>
        {dataKeys.map((key, index) => {
          const isActive = !hiddenBars.has(key);
          return (
            <p
              key={index}
              onClick={() => toggleBarVisibility(key)}
              style={{
                cursor: "pointer",
                opacity: isActive ? 1 : 0.3,
              }}>
              <span style={{ color: info.colors[index] }}>■</span>
              {key}
            </p>
          );
        })}
      </div>
    );
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const rectWidth = width; // Width of the rectangle
    const rectHeight = window.innerWidth < 768 ? 18 : 25; // Set this to match the barSize

    const fontSize = window.innerWidth < 768 ? 11 : 16; // Adjust font size based on window width

    return (
      <g>
        <rect
          x={x} // Positioning the rectangle to the right of the bar
          y={y - rectHeight - 5} // Position the rectangle above the bar
          width={rectWidth}
          height={rectHeight}
          fill="#EFEFEF" // Rectangle color
          rx={5} // Rounded corners
        />
        <text
          fontSize={fontSize}
          x={x + width / 2} // Center the text inside the rectangle
          y={y - rectHeight / 2 - 5} // Center vertically within the rectangle
          fill="#1E1E1E" // Text color
          textAnchor="middle"
          dominantBaseline="middle">
          {value.toFixed(1)}
        </text>
      </g>
    );
  };

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart" id={id}>
          <div className="header-container">
            {info.svg}
            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
                <h3>{info[`unit_${language}`]}</h3>
              </div>
            </div>
            <Download
              data={data}
              filename={info[`title_${language}`]}
              unit={info[`unit_${language}`]}
            />
          </div>
          <ResponsiveContainer height={windowWidth < 768 ? 380 : 420}>
            <BarChart
              data={data}
              margin={
                windowWidth < 768
                  ? { top: 15, right: 5, left: -10, bottom: 5 }
                  : { top: 20, right: 30, left: 20, bottom: 5 }
              }>
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
                tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
                tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
              />
              <Tooltip content={CustomTooltip} />
              {info.legend && windowWidth >= 820 && (
                <Legend content={CustomLegend} />
              )}
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) =>
                hiddenBars.has(el) ? null : (
                  <Bar
                    dataKey={el}
                    key={el}
                    fill={info.colors[i]}
                    minPointSize={3}>
                    {info.label && (
                      <LabelList dataKey={el} content={renderCustomizedLabel} />
                    )}
                  </Bar>
                )
              )}
              <Brush
                dataKey="year"
                height={windowWidth < 768 ? 10 : 20}
                stroke="#115EFE"
                tickFormatter={() => ""} // Hide year labels
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default VerticalBarsByYears;
