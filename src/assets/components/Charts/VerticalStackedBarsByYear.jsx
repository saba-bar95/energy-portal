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
  Brush,
} from "recharts";
import Download from "../Download/Download";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchDataWithCodes from "../../fetchFunctions/fetchDataWithCodes";

const VerticalStackedByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hiddenBars, setHiddenBars] = useState(new Set()); // Track hidden bars

  const id = language === "en" ? `${info.id}-${language}` : info.id;

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

  useEffect(() => {
    setHiddenBars(new Set()); // Reset hiddenBars when language changes
  }, [language]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(info.chartID);

        // Extract available years dynamically from the data
        const yearKeys = Object.keys(rawData[0]).filter((key) =>
          key.startsWith("y_")
        );
        const extractedYears = yearKeys
          .map((key) => parseInt(key.replace("y_", "")))
          .filter((year) => !isNaN(year))
          .sort((a, b) => a - b);

        setAvailableYears(extractedYears);

        // Filter Data and Modify specific items
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
              item.name_ge === "ქარის ელექტროსადგურები"
                ? "ქარი"
                : item.name_ge === "სხვა ბიტუმოვანი"
                ? "სხვა ბიტუმოვანი ქვანახშირი"
                : item.name_ge, // Default case
          }));

        // Sort filteredData so "Other" or "სხვა" always appears last, while others are sorted in descending order
        const latestYearKey = `y_${extractedYears[extractedYears.length - 1]}`;
        filteredData = filteredData.sort((a, b) => {
          const aContainsOther =
            a.name_ge.includes("სხვა") || a.name_en.includes("Other");
          const bContainsOther =
            b.name_ge.includes("სხვა") || b.name_en.includes("Other");

          // Ensure "Other"/"სხვა" goes last
          if (aContainsOther) return 1;
          if (bContainsOther) return -1;

          // If neither contains "Other"/"სხვა", sort by value in descending order for the latest year
          return (b[latestYearKey] || 0) - (a[latestYearKey] || 0);
        });

        if (info.chartName === 4 && info.chartID === 7) {
          filteredData = filteredData.sort((a, b) => {
            const aIsExactOther =
              a.name_ge.trim() === "სხვა" || a.name_en.trim() === "Other";
            const bIsExactOther =
              b.name_ge.trim() === "სხვა" || b.name_en.trim() === "Other";

            // Move exact "Other" or "სხვა" to the last position
            if (aIsExactOther) return 1;
            if (bIsExactOther) return -1;

            // If neither is the exact "Other"/"სხვა", sort by value in descending order for the latest year
            return (b[latestYearKey] || 0) - (a[latestYearKey] || 0);
          });
        }

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
        const stackedData = extractedYears.map((year) => {
          const yearData = { year: year };

          filteredData.forEach((item) => {
            yearData[item[`name_${language}`]] = item[`y_${year}`] || 0;
          });

          return yearData;
        });

        setData(stackedData);
      } catch (error) {
        console.log("Fetch error:", error);
        setAvailableYears([]);
        setData([]);
        setDataKeys([]);
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
                  {value ? value.toFixed(1) : 0}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const CustomLegend = () => (
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

  return (
    <>
      {data.length > 0 && availableYears.length > 0 && (
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
                tick={{
                  style: {
                    fontSize:
                      windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
                  },
                }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
                tick={{
                  style: {
                    fontSize:
                      windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
                  },
                }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend content={CustomLegend} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((key, i) =>
                hiddenBars.has(key) ? null : (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    minPointSize={3}
                    fill={info.colors[i]}
                  />
                )
              )}
              <Brush
                dataKey="year"
                height={windowWidth < 768 ? 10 : windowWidth < 1200 ? 15 : 20} // Reduce height by half
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

export default VerticalStackedByYears;
