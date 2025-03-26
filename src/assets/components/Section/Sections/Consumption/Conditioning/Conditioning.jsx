import { useEffect, useState } from "react";
import fetchLegendCodes from "../../../../../../../fetchData";
import FirstChart from "./FirstChart";
import SecondChart from "./SecondChart";
import firstChartIcon from "/src/assets/images/sections/conditioning/1-chart-icon.svg";
import secondChartIcon from "/src/assets/images/sections/conditioning/2-chart-icon.svg";
import "./Chart.scss";
import "./Conditioning.scss";

const Conditioning = () => {
  const [chartData, setChartData] = useState([null, null]);
  const [loading, setLoading] = useState(true); // New loading state

  const chartsConfig = [
    {
      householdID: 101,
      title_ka:
        "შინამეურნეობების განაწილება საცხოვრისის კონდიცირების სისტემით უზრუნველყოფილი ფართობის მიხედვით",
      title_en:
        "Distribution of households by conditioned area in the dwelling ",
      measurement_ka: "კვ.მ",
      measurement_en: "sq.m",
      icon: firstChartIcon,
      color: ["#3498DB", "#6CD68C", "#ED4C5C"],
      data: chartData[0],
      unit_ka: "კვ.მ",
      unit_en: "sq.m",
    },

    {
      householdID: 102,
      title_ka:
        "შინამეურნეობის საცხოვრისის კონდიცირების სისტემით გაგრილების საშუალო ხანგრძლივობა",
      title_en: "Average duration of dwelling conditioning",
      measurement_ka: "საათი",
      measurement_en: "hour",
      icon: secondChartIcon,
      color: ["#5654D4", "#30B0C7", "#107C41"],
      data: chartData[1],
      unit_ka: "საათი",
      unit_en: "hour",
      chart_unit_ka: "სთ",
      chart_unit_en: "hr",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data

      const results = await Promise.all(
        chartsConfig.map(async (chart) => {
          const respData = await fetchLegendCodes(chart.householdID);
          // return  respData.slice(0, -1)

          return chart.householdID === 101 ? respData.slice(0, -1) : respData;
        })
      );

      setChartData(results);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  return (
    <div className="conditioning-container">
      {loading ? ( // Render loading container if loading is true
        <div className="loading-container">
          <p style={{ fontSize: "20px" }}>Loading...</p>{" "}
          {/* You can customize this loading message or add a spinner */}
        </div>
      ) : (
        <>
          {chartData[0] && <FirstChart data={chartsConfig[0]} />}
          {chartData[1] && <SecondChart data={chartsConfig[1]} />}
        </>
      )}
    </div>
  );
};

export default Conditioning;
