/* eslint-disable react/prop-types */
import { Sankey, Tooltip } from "recharts";
import SankeyData from "./SankeyData";
import { useParams } from "react-router-dom";
import Download from "../Download/Download";
// import fetchSankeyData from "../../../../fetchSankeyData";

const SankeyChart = ({ info }) => {
  const { language } = useParams();

  const MyCustomNode = ({ x, y, width, height, payload }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="#3b82f6"
          fill="#93c5fd"
          strokeWidth={1}
        />
        <text
          x={x}
          y={y + height / 2}
          textAnchor="middle"
          fill="black"
          fontWeight="bold"
          fontSize={13}>
          {language === "ge" ? payload.name_ge : payload.name_en}
        </text>
      </g>
    );
  };

  // const CustomTooltip = ({ active, payload }) => {
  //   if (active && payload && payload.length) {
  //     const { source, target, value } = payload[0].payload;

  //     console.log(payload[0].payload.payload);

  //     return (
  //       <div
  //         style={{
  //           backgroundColor: "white",
  //           border: "1px solid #ccc",
  //           padding: "10px",
  //           borderRadius: "5px",
  //         }}>
  //         <p style={{ fontWeight: "bold", margin: 0 }}>
  //           {/* {source.name[`${language}`]} → {target.name[`${language}`]}{" "} */}

  //           {/* {source.name[`${language}`]} → {target.name[`${language}`]}{" "} */}
  //           {/* {payload[0].payload.payload.name[`${language}`]} */}
  //         </p>
  //         <p style={{ margin: 0 }}>Value: {value}</p>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  return (
    <div
      className="main-chart"
      style={{
        width: "max-content",
        margin: "auto",
      }}>
      <div className="header-container">
        {info.svg}
        <div className="info-wrapper">
          <div className="text-wrapper">
            <h2>{info[`title_${language}`]}</h2>
            <h3>{info[`unit_${language}`]}</h3>
          </div>
        </div>
        <Download
          data={SankeyData}
          filename={info[`title_${language}`]}
          unit={info[`unit_${language}`]}
        />
      </div>
      <Sankey
        width={1000}
        height={500}
        data={SankeyData}
        node={<MyCustomNode />}
        nodePadding={20}
        margin={{ right: 70, left: 50, top: 20, bottom: 20 }}
        link={{ stroke: "red" }}>
        <Tooltip

        // content={<CustomTooltip />}
        />
      </Sankey>
    </div>
  );
};

export default SankeyChart;
