import "./ElectricityAndThermalEnergy.scss";
import Chart_1 from "./Chart_1";
import Chart_2 from "./Chart_2";
import Chart_3 from "./Chart_3";
import Chart_4 from "./Chart_4";
import Chart_5 from "./Chart_5";

const ElectricityAndThermalEnergy = () => {
  return (
    <>
      <div className="charts-container">
        <Chart_1 />
        <Chart_2 />
        <Chart_3 />
        <Chart_4 />
        <Chart_5 />
      </div>
    </>
  );
};

export default ElectricityAndThermalEnergy;
