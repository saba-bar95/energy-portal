import "./Diagram.scss";
import SankeyChart from "../../../../../Charts/Sankey";

const Diagram = () => {
  const chartInfo = {
    title_ge: "ნაკადები",
    unit_ge: "ათასი ტონა ნავთობის ეკვივალენტი",
    title_en: "Flows",
    unit_en: "Thousand Tonnes of Oil Equivalent",
    svg: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.875 22.21C5.92763 22.21 8.66447 20.7048 10.7171 19.6101C12.7697 18.5154 16.0539 16.8733 17.696 16.5996"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.73828 26.9999C6.33828 26.9999 11.1278 24.1263 14.6856 22.3474C18.2435 20.5685 21.1172 19.0632 24.2646 18.7896"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.73828 1H24.2646V5.78939H3.73828V1Z"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.2646 18.7898C22.3488 18.653 18.2435 17.0109 14.0014 14.8215C9.89617 12.7689 6.47512 10.5794 3.73828 10.5794V5.79004C7.02249 5.79004 9.75933 7.56895 14.2751 10.0321C18.7909 12.4952 22.212 14.0004 24.2646 14.0004V18.7898Z"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.2617 1H26.9986V5.78939H24.2617V1Z"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.2617 14H26.9986V18.7894H24.2617V14Z"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 22.2095H3.73684V26.9989H1V22.2095Z"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 1H3.73684V10.5788H1V1Z"
          stroke="#1E1E1E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return (
    <div className="diagram-container ">
      <div className="container-ss">
        <SankeyChart info={chartInfo} />
      </div>
    </div>
  );
};

export default Diagram;
