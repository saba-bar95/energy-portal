import { useEffect, useState, useMemo } from "react";
import fetchLegendCodes from "../../../../../../../fetchData";
import FirstChart from "./FirstChart";
import SecondChart from "./SecondChart";
import firstChartIcon from "/src/assets/images/sections/conditioning/1-chart-icon.svg";
import secondChartIcon from "/src/assets/images/sections/conditioning/2-chart-icon.svg";
import "./Chart.scss";
import "./Conditioning.scss";

const Conditioning = () => {
  const [chartData, setChartData] = useState([null, null]);

  const chartsConfig = useMemo(
    () => [
      {
        householdID: 101,
        title_ge:
          "შინამეურნეობების განაწილება საცხოვრისის კონდიცირების სისტემით უზრუნველყოფილი ფართობის მიხედვით",
        title_en:
          "Distribution of households by conditioned area in the dwelling ",
        measurement_ge: "კვ.მ",
        measurement_en: "sq.m",
        icon: firstChartIcon,
        color: ["#3498DB", "#6CD68C", "#ED4C5C"],
        unit_ge: "კვ.მ",
        unit_en: "sq.m",
      },
      {
        householdID: 102,
        title_ge:
          "შინამეურნეობის საცხოვრისის კონდიცირების სისტემით გაგრილების საშუალო ხანგრძლივობა",
        title_en: "Average duration of dwelling conditioning",
        measurement_ge: "საათი",
        measurement_en: "hour",
        icon: secondChartIcon,
        color: ["#5654D4", "#30B0C7", "#107C41"],
        unit_ge: "საათი",
        unit_en: "hour",
        chart_unit_ge: "სთ",
        chart_unit_en: "hr",
      },
    ],
    [] // No dependencies since this is static configuration
  );

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        chartsConfig.map(async (chart) => {
          const respData = await fetchLegendCodes(chart.householdID);
          return chart.householdID === 101 ? respData.slice(0, -1) : respData;
        })
      );

      setChartData(results);
    };

    fetchData();
  }, [chartsConfig]); // chartsConfig is stable due to useMemo with []

  return (
    <div className="conditioning-container">
      {chartData[0] && (
        <FirstChart data={{ ...chartsConfig[0], data: chartData[0] }} />
      )}
      {chartData[1] && (
        <SecondChart data={{ ...chartsConfig[1], data: chartData[1] }} />
      )}
    </div>
  );
};

export default Conditioning;
