import { useEffect, useState } from "react";
import fetchLegendCodes from "../../../../../../../fetchData";
import FirstChart from "./FirstChart";
import SecondChart from "./SecondChart";
import firstChartIcon from "/src/assets/images/sections/conditioning/1-chart-icon.svg";
import secondChartIcon from "/src/assets/images/sections/conditioning/2-chart-icon.svg";

const Conditioning = () => {
  const [chartData, setChartData] = useState([null, null]);

  const chartsConfig = [
    {
      householdID: 101,
      title_ka:
        "შინამეურნეობების განაწილება საცხოვრისის კონდიცირების სისტემით უზრუნველყოფილი ფართობის მიხედვით",
      title_en:
        "Distribution of households by area provided with air conditioning system in their dwellings",
      measurement_ka: "კვ/მ",
      measurement_en: "sq/m",
      icon: firstChartIcon,
      color: ["#3498DB", "#6CD68C", "#ED4C5C"],
      data: chartData[0],
      unit_ka: "კვ/მ",
      unit_en: "sq/m",
    },

    {
      householdID: 102,
      title_ka:
        "შინამეურნეობის საცხოვრისის კონდიცირების სისტემით გაგრილების საშუალო ხანგრძლივობა",
      title_en:
        "Average duration of cooling with household air conditioning system",
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
      const dataPromises = chartsConfig.map(async (chart) => {
        const respData = await fetchLegendCodes(chart.householdID);
        return respData.slice(0, -1);
      });
      const results = await Promise.all(dataPromises);
      setChartData(results);
    };

    fetchData();
  }, []);

  return (
    <div className="conditioning-container">
      {chartData[0] && <FirstChart data={chartsConfig[0]} />}
      {chartData[1] && <SecondChart data={chartsConfig[1]} />}
    </div>
  );
};

export default Conditioning;
