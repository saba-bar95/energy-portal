/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import Download from "../Download/Download";
import fetchDataWithCodes from "../../../../fetchDataWithCodes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";

const MultipleLineChartByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hiddenBars, setHiddenBars] = useState(new Set()); // Track hidden bars

  const toggleBarVisibility = (key) => {
    setHiddenBars((prev) => {
      const newSet = new Set(prev);

      // If it's the last remaining visible bar, prevent hiding
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
        const filteredData = rawData.filter(
          (item) =>
            item.name === info.chartName &&
            item.chart_id === info.chartID &&
            item.name_ge !== "სულ"
        );

        let newDataKeys = []; // Start with an empty array

        filteredData.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            newDataKeys.push(name); // Push to newDataKeys if it exists and is unique
          }
        });

        // **Sort newDataKeys to ensure "Other"/"სხვა" is last**
        newDataKeys.sort((a, b) => {
          const aContainsOther = a.includes("Other") || a.includes("სხვა");
          const bContainsOther = b.includes("Other") || b.includes("სხვა");

          if (aContainsOther) return 1;
          if (bContainsOther) return -1;
          return 0; // Maintain original order otherwise
        });

        // Update the state with the sorted array
        setDataKeys(newDataKeys);

        const stackedData = chartYears.map((year) => {
          const yearData = {
            year: year,
          };

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

          <ResponsiveContainer height={window.innerWidth < 768 ? 450 : 630}>
            <LineChart
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
                padding={{ top: 30, bottom: 10 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
                tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
              />
              <Tooltip content={CustomTooltip} />
              {windowWidth >= 820 && <Legend content={CustomLegend} />}
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) =>
                hiddenBars.has(el) ? null : (
                  <Line
                    dataKey={el}
                    key={el}
                    stroke={info.colors[i]}
                    strokeWidth={3}
                    dot={false} // Set to true if you want to show dots on the line
                    filter={`url(#line-shadow-${info.colors[i]})`}
                  />
                )
              )}
              <Brush
                dataKey="year"
                height={windowWidth < 768 ? 10 : 20}
                stroke="#115EFE"
                tickFormatter={() => ""} // Hide year labels
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default MultipleLineChartByYears;
