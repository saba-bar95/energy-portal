import "./Indicators.scss";
import Chart from "./Chart";

const Indicators = () => {
  const chartNames = [
    {
      name: 89,
      color: "#30B0C7",
      linear:
        "linear-gradient(180deg, rgba(48, 176, 199, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
    },
    {
      name: 90,
      color: "#ED4C5C80",
      linear:
        "linear-gradient(180deg, rgba(237, 76, 92, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
    },
    {
      name: 91,
      color: "#6FAEA9",
      linear:
        "linear-gradient(180deg, rgba(111, 174, 169, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
    },
    {
      name: 92,
      color: "#BE6433",
      linear:
        "linear-gradient(180deg, rgba(190, 100, 51, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
    },
    {
      name: 93,
      color: "#084E99",
      linear:
        "linear-gradient(180deg, rgba(8, 78, 153, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
    },
  ];

  return (
    <div className="indicators-container">
      {chartNames.map((chart) => (
        <Chart key={chart.name} info={chart} />
      ))}
    </div>
  );
};

export default Indicators;
