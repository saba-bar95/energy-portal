import Chart_1 from "./Chart_1";
import Chart_2 from "./Chart_2";
import Chart_3 from "./Chart_3";
import Chart_4 from "./Chart_4";

const Coal = () => {
  return (
    <div className="electricity">
      <div className="ss-container">
        <div className="div">
          <Chart_1 />
          <Chart_2 />
        </div>
        <div className="div">
          <Chart_3 />
          <Chart_4 />
        </div>
      </div>
    </div>
  );
};

export default Coal;
