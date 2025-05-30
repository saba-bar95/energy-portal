/* eslint-disable react/prop-types */
import { Tooltip, ResponsiveContainer, Treemap } from "recharts";
import Download from "../Download/Download";
import fetchMainDataIndicators from "../../../../fetchMainIndicators";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";
import YearDropdown from "../YearDropdown/YearDropdown";
import "./TreeMap.scss";

const TreeMap = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2023);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchMainDataIndicators(info.chartID);
        const result = [];

        chartYears.forEach((year) => {
          const yearKey = `y_${year}`; // Key for the first six months
          // Create objects for each time period
          const yearData = { year: `${year}` };

          // Loop through names to populate data
          info.names.forEach(({ code, name_en, name_ge }) => {
            const matchingRawData = rawData.find(
              (data) => data.legend_code === code
            );

            const nameKey = language === "en" ? name_en : name_ge;

            yearData[nameKey] = matchingRawData?.[yearKey] || 0; // First 6 months
          });

          // Push the processed data objects to the result array
          result.push(yearData);
        });

        const currentYear = result.find((entry) => +entry.year === +year);

        const transformedData = [
          {
            children: Object.keys(currentYear)
              .filter((key) => key !== "year") // Exclude the 'year' key
              .map((key, index) => ({
                name: key,
                value: currentYear[key], // Only non-zero values will be included
                color: info.colors[index] || "#8884d8",
              }))
              .filter((entry) => entry.value > 0), // Remove entries where value is 0
          },
        ];

        setData(transformedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [language, info.chartID, info.names, info.colors, year]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
        }}>
        <div className="tooltip-container">
          {payload.map(({ payload }, index) => {
            const { name, value, color } = payload; // Extract color from the payload
            return (
              <p key={`item-${index}`} className="text" style={{ color }}>
                <span
                  style={{ color, fontWeight: "bold" }}
                  className="before-span"></span>
                {name} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {value.toFixed(1)} %
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const CustomTreeMapCell = ({ x, y, width, height, name, color }) => {
    const padding = 0; // Adjust this for spacing

    return (
      <g>
        <rect
          x={x + padding}
          y={y + padding}
          width={width - 2 * padding}
          height={height - 2 * padding}
          fill={color}
          stroke="#fff"
        />
        {/* Hide text if the cell is too small */}
        {width > 50 && height > 20 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fontFamily="FiraGOLight"
            fontWeight="300"
            fill="white">
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <>
      {data.length > 0 && (
        <div
          className="main-chart tree-map-chart"
          style={{
            padding: "30px 30px 40px 30px",
          }}>
          <div className="header-container" style={{ padding: 0 }}>
            {info.svg}
            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
              </div>
            </div>
            <div className="year-wrapper">
              <YearDropdown years={chartYears} year={year} setYear={setYear} />
              <Download
                data={data}
                filename={info[`title_${language}`]}
                isTreeMap={true}
                year={year}
              />
            </div>
          </div>
          <ResponsiveContainer height={420}>
            <Treemap
              data={data}
              dataKey="value"
              nameKey="name"
              ratio={4 / 3}
              stroke="#fff"
              animationDuration={0} // Disable animations
              content={<CustomTreeMapCell />}>
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default TreeMap;
