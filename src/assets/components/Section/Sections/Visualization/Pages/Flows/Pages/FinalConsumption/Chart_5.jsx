/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";

const Chart_5 = () => {
  const [data, setData] = useState([]);
  const chartID = useMemo(() => [35], []);
  const { language } = useParams();

  const text = {
    ka: {
      title:
        "ენერგორესურსების საბოლოო მოხმარება ენერგეტიკული და არაენერგეტიკული მიზნებისთვის",
      unit: "ათასი ტნე",
    },
    en: {
      title:
        "Final consumption of energy resources for energy and non-energy purposes",
      unit: "ktoe",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataWithCodes(chartID[0]);

        console.log(result);

        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [chartID]);

  // Transform data for Recharts
  const chartData = useMemo(() => {
    const years = [
      2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    ];
    return years.map((year) => {
      const yearData = {
        year,
      };

      const item15 = data.find((item) => item.legend_code === 87);
      const item7 = data.find((item) => item.legend_code === 88);

      if (item15 && item7) {
        const value15 = item15[`y_${year}`];
        const value7 = item7[`y_${year}`];
        yearData["chart_id_15"] = ((value15 - value7) / value15) * 100;
        yearData["chart_id_7"] = (value7 / value15) * 100;
        yearData["name_15_en"] = item15.name_en;
        yearData["name_15_ge"] = item15.name_ge;
        yearData["name_7_en"] = item7.name_en;
        yearData["name_7_ge"] = item7.name_ge;
      }

      return yearData;
    });
  }, [data]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ dataKey, color }, index) => {
            const chartId = dataKey.replace("chart_id_", "");
            const displayName =
              language === "ka"
                ? payload[index].payload[`name_${chartId}_ge`]
                : payload[index].payload[`name_${chartId}_en`];

            // Find the original value from the 'data' state
            const year = payload[index].payload.year;
            const originalItem = data.find(
              (item) => item.legend_code === (chartId === "15" ? 87 : 88)
            );
            const originalValue = originalItem
              ? originalItem[`y_${year}`]
              : "N/A";

            return (
              <p key={`item-${index}`} className="text">
                <span style={{ color }} className="before-span">
                  ■
                </span>
                {displayName} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {originalValue !== "N/A" ? originalValue.toFixed(1) : "N/A"}
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
          const chartId = entry.dataKey.replace("chart_id_", "");
          let displayName = entry.dataKey; // Default to dataKey

          if (chartData.length > 0) {
            const firstDataPoint = chartData[0];
            if (language === "ka") {
              displayName = firstDataPoint[`name_${chartId}_ge`] || displayName;
            } else {
              displayName = firstDataPoint[`name_${chartId}_en`] || displayName;
            }
          }

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

  return (
    <div className="main-chart">
      <div className="header-container">
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26.4353 7.76102C25.9637 7.194 25.3034 6.86324 24.5488 6.86324H24.1244L19.9271 2.65788C19.5969 2.32712 19.0782 2.32712 18.748 2.65788L17.5219 3.83916L13.9376 0.248069C13.6075 -0.0826897 13.0887 -0.0826897 12.7586 0.248069L9.17436 3.83916L8.23114 2.89414C7.90101 2.56338 7.38224 2.56338 7.05212 2.89414L3.09059 6.86324H2.43034C1.67576 6.86324 1.01551 7.194 0.543899 7.76102C0.072289 8.32803 -0.116355 9.0368 0.072289 9.79282L2.52466 21.7946C2.76046 22.9287 3.75084 23.7319 4.88271 23.7319C5.35432 25.055 6.5805 26 8.04249 26C9.50448 26 10.7307 25.055 11.2023 23.7319H15.8241C16.2957 25.055 17.5218 26 18.9838 26C20.4458 26 21.672 25.055 22.1436 23.7319C23.3227 23.7319 24.2659 22.9287 24.5017 21.7946L26.954 9.79282C27.0955 9.08405 26.9069 8.32803 26.4353 7.76102ZM19.314 4.45343L21.7192 6.86324H16.9088L19.314 4.45343ZM13.3245 2.04362L16.3428 5.0677L14.5507 6.86324H12.1455L10.3534 5.0677L13.3245 2.04362ZM7.57088 4.73694L9.74029 6.9105H5.40148L7.57088 4.73694ZM1.77008 8.8478C1.91156 8.65879 2.10021 8.56429 2.33602 8.56429H24.5488C24.7846 8.56429 24.9733 8.65879 25.1148 8.8478C25.2562 9.0368 25.3034 9.22581 25.2563 9.46206L25.0204 10.5488H1.81724L1.58144 9.46206C1.58144 9.22581 1.6286 9.0368 1.77008 8.8478ZM7.99534 24.299C7.09928 24.299 6.3447 23.5429 6.3447 22.6452C6.3447 21.7474 7.09928 20.9914 7.99534 20.9914C8.89139 20.9914 9.64597 21.7474 9.64597 22.6452C9.64597 23.5429 8.89139 24.299 7.99534 24.299ZM18.9367 24.299C18.0406 24.299 17.286 23.5429 17.286 22.6452C17.286 21.7474 18.0406 20.9914 18.9367 20.9914C19.8327 20.9914 20.5873 21.7474 20.5873 22.6452C20.5873 23.5429 19.8327 24.299 18.9367 24.299ZM22.8039 21.4639C22.7567 21.7946 22.5209 21.9836 22.1908 22.0309C21.9078 20.4716 20.5402 19.2903 18.8895 19.2903C17.2389 19.2903 15.8712 20.4716 15.5882 22.0309H11.2023C10.9193 20.4716 9.55164 19.2903 7.90101 19.2903C6.25037 19.2903 4.8827 20.4716 4.59974 22.0309C4.31677 21.9836 4.08097 21.7474 3.98665 21.4639L2.10021 12.2499H24.596L22.8039 21.4639Z"
            fill="#1E1E1E"
          />
        </svg>

        <div className="text-wrapper">
          <h2>{text[language].title}</h2>
          <h3>{text[language].unit}</h3>
        </div>
        <Download />
      </div>
      <ResponsiveContainer height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis
            dataKey="year"
            tickLine={false}
            padding={{ right: 15, left: 15 }}
            axisLine={{ stroke: "#B7B7B7" }}
          />
          <YAxis
            tickLine={false}
            padding={{ top: 30 }}
            axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
          />
          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

          <Bar
            dataKey="chart_id_15"
            fill="#ED4C5C"
            name={
              language === "ka"
                ? chartData[0]?.name_15_ge
                : chartData[0]?.name_15_en
            }
            stackId="a"
          />

          <Bar
            dataKey="chart_id_7"
            fill="#3FC8E4"
            name={
              language === "ka"
                ? chartData[0]?.name_16_ge
                : chartData[0]?.name_16_en
            }
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_5;
