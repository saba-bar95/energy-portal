import { useEffect, useState, useMemo } from "react";
import fetchData from "../../../../../../../fetchData";
import Chart from "./Chart";
import firstChartIcon from "/src/assets/images/sections/consumption/1-chart-icon.svg";
import secondChartIcon from "/src/assets/images/sections/consumption/2-chart-icon.svg";

const Heating = () => {
  const [chartData, setChartData] = useState([null, null]);

  const chartsConfig = useMemo(
    () => [
      {
        householdID: 99,
        title_ka:
          "შინამეურნეობების საცხოვრისის განაწილება გათბობის ტიპების მიხედვით",
        title_en: "Distribution of household dwellings by heating type",
        icon: firstChartIcon,
        color: ["#3498DB", "#6CD68C", "#ED4C5C"],
      },
      {
        householdID: 100,
        title_ka:
          "შინამეურნეობების წილი გათბობის ინდივიდუალური საშუალებებში გამოყენებული ენერგორესურსების მიხედვით",
        title_en:
          "Share of households by energy resources used in individual heating systems",
        icon: secondChartIcon,
        color: ["#556EB0", "#6FAEA9", "#FF9F0A"],
      },
    ],
    []
  ); // Empty dependency array means it will only be created once

  useEffect(() => {
    const getData = async () => {
      const dataPromises = chartsConfig.map(async (chart) => {
        const respData = await fetchData(chart.householdID);
        return respData.slice(0, -1);
      });
      const results = await Promise.all(dataPromises);
      setChartData(results);
    };

    getData();
  }, [chartsConfig]);

  return (
    <div className="heating-container">
      {chartData.map(
        (data, index) =>
          data && (
            <Chart
              key={chartsConfig[index].householdID}
              data={{ ...chartsConfig[index], data }}
            />
          )
      )}
    </div>
  );
};

export default Heating;
