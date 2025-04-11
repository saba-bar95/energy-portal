import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import AnimatedNumber from "./AnimatedNumber";

const Svg1 = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.4667 16.9527H15.5667L11.8667 4.90909H16.5667V5.95636C16.5667 6.25091 16.8 6.48 17.1 6.48C17.4 6.48 17.6333 6.25091 17.6333 5.95636V4.38545C17.6333 4.22182 17.5333 4.05818 17.4 3.96L11.5333 0.163636C11.4333 0.0654545 11.3 0 11.1667 0H6.86667C6.73333 0 6.6 0.0654545 6.5 0.130909L0.566667 3.92727C0.433333 4.02545 0.333333 4.18909 0.333333 4.38545V5.95636C0.333333 6.25091 0.566667 6.48 0.866667 6.48C1.16667 6.48 1.4 6.25091 1.4 5.95636V4.90909H6.1L2.43333 16.9527H0.533333C0.233333 16.9527 0 17.1818 0 17.4764C0 17.7709 0.233333 18 0.533333 18H17.4667C17.7667 18 18 17.7709 18 17.4764C18 17.1818 17.7667 16.9527 17.4667 16.9527ZM6.66667 6.80727L8.1 7.78909L5.9 9.32727L6.66667 6.80727ZM12.1 9.36L9.9 7.82182L11.3333 6.84L12.1 9.36ZM12.6667 11.2255L14.1667 16.1673L9.9 13.1891L12.6667 11.2255ZM11.9 10.4727L9 12.5018L6.1 10.4727L9 8.44364L11.9 10.4727ZM5.3 11.2255L8.06667 13.1564L3.8 16.1345L5.3 11.2255ZM9 13.8109L13.4667 16.9527H4.53333L9 13.8109ZM7.36667 3.86182V1.04727H10.6333V3.86182H7.36667ZM6.3 3.86182H2.66667L6.3 1.50545V3.86182ZM11.7 1.50545L15.3333 3.86182H11.7V1.50545ZM10.7667 4.90909L11.0333 5.76L9 7.16727L6.96667 5.76L7.23333 4.90909H10.7667Z"
        fill="#FB7840"
      />
    </svg>
  );
};

const Svg2 = () => {
  return (
    <svg
      width="14"
      height="19"
      viewBox="0 0 14 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.7896 7.19784L11.6917 7.10113L11.6736 7.08609C10.2546 5.90819 9.56462 4.14106 9.78052 2.23773L10.0344 0L7.85708 1.17481C5.54317 2.42327 4.01977 4.7362 3.76339 7.32238L1.3203 6.60903L1.12956 7.04463C0.360974 8.79911 -0.0188209 10.4833 0.000717097 12.0506C0.0220823 13.7601 0.707316 15.363 1.9302 16.5643C3.15069 17.7632 4.76545 18.4236 6.47678 18.4236H7.52381C11.0749 18.4236 13.9801 15.5622 13.9999 12.0448C14.011 10.0628 13.2878 8.47708 11.7896 7.19784ZM6.73836 17.3416C5.41681 17.3416 4.32816 16.2716 4.31172 14.9564C4.30497 14.4175 4.41264 13.8381 4.6322 13.229L6.16768 13.6773L6.17415 12.9625C6.18357 11.9249 6.7073 10.9667 7.55909 10.3964C7.55656 11.4519 7.99596 12.4166 8.79968 13.0931L8.83131 13.1243L8.86153 13.152C9.43769 13.6413 9.69267 14.1986 9.68845 14.959C9.681 16.2729 8.5925 17.3416 7.26195 17.3416H6.73836ZM10.3863 16.5243C10.6288 16.0556 10.7673 15.5258 10.7703 14.9652C10.7764 13.8929 10.3863 13.0343 9.57797 12.341L9.52765 12.2912L9.50952 12.2763C8.86223 11.7388 8.56017 10.9626 8.65898 10.0907L8.84424 8.45741L7.30004 9.29065C6.16009 9.90574 5.37914 11.0044 5.15691 12.2551L4.00783 11.9196L3.81708 12.355C3.41719 13.2678 3.21956 14.1476 3.22996 14.97C3.23671 15.5152 3.36827 16.0405 3.61032 16.5131C2.11377 15.5706 1.10623 13.9165 1.08261 12.0371C1.06659 10.7532 1.3539 9.36894 1.93694 7.91625L4.80087 8.75244L4.80734 8.03769C4.82982 5.56579 6.19523 3.30093 8.37083 2.12711L8.72603 1.93538L8.70551 2.11586C8.4487 4.38016 9.27169 6.48801 10.9642 7.90332L11.0432 7.98147L11.0734 8.00916C12.3411 9.08571 12.9273 10.3662 12.918 12.0388C12.9073 13.9249 11.8964 15.584 10.3863 16.5243Z"
        fill="#4441EA"
      />
    </svg>
  );
};

const Svg3 = () => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.6026 5.44855C18.2707 5.05048 17.8061 4.81827 17.2751 4.81827H16.9764L14.0227 1.86594C13.7904 1.63373 13.4254 1.63373 13.1931 1.86594L12.3302 2.69525L9.80795 0.174154C9.57564 -0.0580515 9.21058 -0.0580515 8.97827 0.174154L6.45603 2.69525L5.79228 2.0318C5.55997 1.7996 5.19491 1.7996 4.9626 2.0318L2.17486 4.81827H1.71024C1.17924 4.81827 0.714617 5.05048 0.382744 5.44855C0.05087 5.84661 -0.0818794 6.3442 0.05087 6.87495L1.77661 15.3007C1.94255 16.0968 2.63948 16.6608 3.43598 16.6608C3.76785 17.5896 4.63072 18.253 5.65953 18.253C6.68834 18.253 7.55121 17.5896 7.88308 16.6608H11.1354C11.4673 17.5896 12.3302 18.253 13.359 18.253C14.3878 18.253 15.2507 17.5896 15.5826 16.6608C16.4122 16.6608 17.076 16.0968 17.2419 15.3007L18.9677 6.87495C19.0672 6.37737 18.9345 5.84661 18.6026 5.44855ZM13.5913 3.12649L15.2839 4.81827H11.8988L13.5913 3.12649ZM9.37651 1.4347L11.5005 3.55773L10.2394 4.81827H8.54683L7.28572 3.55773L9.37651 1.4347ZM5.32766 3.32552L6.85428 4.85145H3.80104L5.32766 3.32552ZM1.24561 6.21151C1.34517 6.07882 1.47793 6.01248 1.64386 6.01248H17.2751C17.441 6.01248 17.5738 6.07882 17.6734 6.21151C17.7729 6.3442 17.8061 6.47689 17.7729 6.64275L17.607 7.40571H1.2788L1.11286 6.64275C1.11286 6.47689 1.14605 6.3442 1.24561 6.21151ZM5.62635 17.0588C4.99579 17.0588 4.46479 16.5281 4.46479 15.8978C4.46479 15.2675 4.99579 14.7368 5.62635 14.7368C6.25691 14.7368 6.7879 15.2675 6.7879 15.8978C6.7879 16.5281 6.25691 17.0588 5.62635 17.0588ZM13.3258 17.0588C12.6953 17.0588 12.1643 16.5281 12.1643 15.8978C12.1643 15.2675 12.6953 14.7368 13.3258 14.7368C13.9564 14.7368 14.4874 15.2675 14.4874 15.8978C14.4874 16.5281 13.9564 17.0588 13.3258 17.0588ZM16.0472 15.0685C16.014 15.3007 15.8481 15.4334 15.6157 15.4666C15.4166 14.3719 14.4542 13.5426 13.2926 13.5426C12.1311 13.5426 11.1686 14.3719 10.9695 15.4666H7.88308C7.68396 14.3719 6.72153 13.5426 5.55997 13.5426C4.39841 13.5426 3.43598 14.3719 3.23685 15.4666C3.03773 15.4334 2.8718 15.2675 2.80542 15.0685L1.47793 8.59991H17.3083L16.0472 15.0685Z"
        fill="#1E1E1E"
      />
    </svg>
  );
};

const Svg4 = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.4764 16.983H16.5273V3.07305C16.9527 2.90902 17.28 2.61376 17.4764 2.18727C17.64 1.7936 17.64 1.36711 17.4764 0.973435C17.1491 0.153273 16.2327 -0.207599 15.4145 0.120466C14.76 0.382918 14.4 1.00624 14.4327 1.66237L10.2436 3.40111C9.94909 3.04024 9.52364 2.8434 9.03273 2.8434C8.14909 2.8434 7.46181 3.56515 7.46181 4.41812C7.46181 4.45092 7.46181 4.51653 7.46181 4.54934L3.6 6.12405C3.56727 5.82879 3.6 5.53354 3.73091 5.23828C3.82909 4.97583 3.69818 4.64776 3.43636 4.54934L1.47273 3.72918C1.21091 3.63076 0.883634 3.72918 0.785452 4.02444C0.261816 5.27108 0.261816 6.61615 0.785452 7.8628C1.30909 9.10944 2.25819 10.0608 3.50182 10.5857C3.76364 10.6842 4.0909 10.5857 4.18909 10.2905L5.00727 8.32209C5.10545 8.05964 5.00727 7.73157 4.71273 7.63315C4.41818 7.50192 4.18909 7.33789 3.99273 7.10825L7.78909 5.53354L3.86181 16.9502H0.523638C0.229093 16.9502 0 17.1798 0 17.4751C0 17.7704 0.229093 18 0.523638 18H17.4764C17.7709 18 18 17.7704 18 17.4751C18 17.2126 17.7709 16.983 17.4764 16.983ZM15.7745 1.07185C16.0364 0.973435 16.3636 1.07185 16.4618 1.36711C16.56 1.62956 16.4618 1.95763 16.1673 2.05605C15.9055 2.15447 15.5782 2.05605 15.48 1.76079C15.3818 1.49834 15.5127 1.20308 15.7745 1.07185ZM14.8254 2.64657C14.9891 2.8434 15.2182 2.97463 15.48 3.07305V16.983H14.1382L10.1782 5.50073C10.44 5.20547 10.5709 4.8446 10.5709 4.45092V4.41812L14.8254 2.64657ZM6.28364 13.2431L8.05091 14.3913L5.26909 16.1956L6.28364 13.2431ZM6.77455 11.7668H11.2255L11.3891 12.2261L9 13.768L6.61091 12.2261L6.77455 11.7668ZM8.7709 5.99283C8.93454 6.02563 9.09819 6.02563 9.22909 5.99283L10.8655 10.717H7.13454L8.7709 5.99283ZM12.7636 16.2284L9.98182 14.4241L11.7491 13.2759L12.7636 16.2284ZM9 15.0474L11.9782 16.983H6.02182L9 15.0474ZM9 3.89321C9.29455 3.89321 9.52364 4.12286 9.52364 4.41812C9.52364 4.71337 9.29455 4.94302 9 4.94302C8.70545 4.94302 8.47636 4.71337 8.47636 4.41812C8.47636 4.12286 8.70545 3.89321 9 3.89321ZM3.46909 9.37189C2.71637 8.94541 2.16 8.28928 1.8 7.46912C1.47273 6.64896 1.40727 5.76318 1.63636 4.94302L2.61818 5.3367C2.48727 5.89441 2.55273 6.48492 2.78182 7.04263C3.01091 7.60034 3.40363 8.05964 3.86181 8.35489L3.46909 9.37189Z"
        fill="#084E99"
      />
    </svg>
  );
};

const Svg5 = () => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.54301 2.772C5.54301 3.1633 5.08649 3.45678 4.49954 3.45678C3.91258 3.45678 3.45605 3.1633 3.45605 2.772C3.45605 2.38069 3.91258 2.08721 4.49954 2.08721C5.05388 2.0546 5.54301 2.38069 5.54301 2.772Z"
        fill="#138C00"
      />
      <path
        d="M13.3696 12.4239C14.9348 12.4239 16.1739 11.9348 17.0544 10.9891C18.6848 9.19565 18.6522 6.19565 18.4565 4.1087C18.4239 3.88043 18.2935 3.65217 18.0652 3.55435C17.837 3.45652 17.5761 3.45652 17.3804 3.58696C16.663 4.07609 15.9783 4.17391 15.2609 4.27174C14.6739 4.36957 14.087 4.46739 13.5 4.72826C11.9022 5.47826 11.0543 7.04348 11.0543 9.13043C11.0543 9.52174 11.3478 9.81522 11.7391 9.81522C12.1304 9.81522 12.4239 9.52174 12.4239 9.13043C12.4239 8.05435 12.7174 6.61956 14.087 5.96739C14.5109 5.77174 14.9674 5.70652 15.4891 5.6087C16.0109 5.54348 16.5652 5.44565 17.1522 5.21739C17.2174 6.91304 17.087 8.90217 16.0435 10.0435C15.4891 10.663 14.6739 10.9891 13.5978 11.0217C13.9565 10.1413 14.6087 9.29348 15.6522 8.28261C15.913 8.02174 15.9457 7.59783 15.6848 7.30435C15.4239 7.04348 15 7.01087 14.7065 7.27174C12.1957 9.65217 11.7391 11.4783 11.7391 14.2174C11.7391 14.4457 11.8696 14.6739 12.0652 14.8043C12.3587 15 12.4239 15.1304 12.4239 15.163C12.4239 15.5217 10.5326 16.5326 6.91305 16.5326C3.29348 16.5326 1.40218 15.5217 1.40218 15.163C1.40218 15.1304 1.46739 15 1.76087 14.8043C1.95652 14.6739 2.08695 14.4457 2.08695 14.2174V10.9891C3.42391 11.4783 5.18479 11.7065 6.91305 11.7065C8.31522 11.7065 9.68478 11.5435 10.7935 11.2826C11.1522 11.1848 11.3804 10.8261 11.2826 10.4348C11.1848 10.0761 10.8261 9.84783 10.4348 9.94565C9.3913 10.2065 8.18478 10.337 6.88044 10.337C3.26087 10.337 1.36957 9.32609 1.36957 8.96739C1.36957 8.93478 1.43479 8.80435 1.72827 8.6087C1.92392 8.47826 2.05435 8.25 2.05435 8.02174V4.79348C3.39131 5.28261 5.15218 5.51087 6.88044 5.51087C10.2065 5.51087 13.7935 4.66304 13.7935 2.73913C13.7935 0.815217 10.2391 0 6.91305 0C3.58696 0 0 0.847826 0 2.77174C0 3.26087 0.260872 3.71739 0.684785 4.07609V7.69565C0.130437 8.15217 0 8.6413 0 9C0 9.48913 0.260872 9.94565 0.684785 10.3043V13.9239C0.130437 14.3804 0 14.8696 0 15.2283C0 17.1196 3.58696 18 6.91305 18C10.2391 18 13.8261 17.1522 13.8261 15.2283C13.8261 14.8696 13.6957 14.413 13.1413 13.9239C13.1413 13.4022 13.1739 12.913 13.2391 12.4565L13.3696 12.4239ZM6.91305 1.36957C10.5326 1.36957 12.4239 2.38043 12.4239 2.73913C12.4239 3.09783 10.5326 4.1087 6.91305 4.1087C3.29348 4.1087 1.40218 3.09783 1.40218 2.73913C1.40218 2.38043 3.29348 1.36957 6.91305 1.36957Z"
        fill="#138C00"
      />
    </svg>
  );
};

const EnergyConsumption = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const lastYear = 2023;

  const widgets = useMemo(
    () => [
      {
        name_ge: "ელექტროენერგია",
        name_en: "Electricity",
        legendCode: 43,
        svg: <Svg1 />,
        unit_ge: "გვტ.სთ",
        unit_en: "GWh",
      },
      {
        name_ge: "ბუნებრივი გაზი",
        name_en: "Natural Gas",
        legendCode: 2,
        svg: <Svg2 />,
        unit_ge: "მლნ.მ³",
        unit_en: "mil.m³",
      },
      {
        name_ge: "ქვანახშირი",
        name_en: "Coal",
        legendCode: 3,
        svg: <Svg3 />,
        unit_ge: "ათასი ტონა",
        unit_en: "thousand tons",
      },
      {
        name_ge: "ნავთობპროდუქტები",
        name_en: "Oil and oil products",
        legendCode: 36,
        svg: <Svg4 />,
        unit_ge: "ათასი ტონა",
        unit_en: "thousand tons",
      },
      {
        name_ge: "ბიოსაწვავი და ნარჩენები",
        name_en: "Biofuels and waste",
        legendCode: 5,
        svg: <Svg5 />,
        unit_ge: "ათასი ტნე",
        unit_en: "ktoe",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await Promise.all(
          widgets.map(async (widget) => {
            const response = await fetch(
              `http://192.168.1.27:3000/api/energyConsumption/${widget.legendCode}`
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const rawData = await response.json();
            return {
              name_ge: widget.name_ge,
              name_en: widget.name_en,
              data: rawData,
            };
          })
        );

        setData(allData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, [widgets]);

  return (
    <div className="widget-container">
      {data.map((widgetData, index) => {
        const currentName = widgetData[`name_${language}`];
        const percentageChange = widgetData.data[0].growthRate;

        const isNameInWidgets = widgets.find(
          (widget) => widget[`name_${language}`] === currentName
        );

        return (
          <div className="widget-wrapper" key={index}>
            <div className="top">
              {isNameInWidgets?.svg}{" "}
              {/* Optional chaining to avoid errors if isNameInWidgets is undefined */}
              <h3>{currentName}</h3>
            </div>
            <div className="middle">
              <h2>
                <AnimatedNumber
                  targetValue={widgetData.data[0][`y_${lastYear}`]}
                  duration={1000}
                />
              </h2>
              <h3>{isNameInWidgets[`unit_${language}`]}</h3>
            </div>
            <div className="bottom">
              <div className="left">
                <p>
                  {percentageChange >= 0 ? (
                    <svg
                      width="14"
                      height="9"
                      viewBox="0 0 14 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.59961 8L4.20024 4.19726C4.36152 3.96417 4.59653 3.80607 4.8588 3.75422C5.11844 3.70007 5.38713 3.75403 5.61256 3.90559L8.14935 5.66544C8.38455 5.82788 8.66455 5.88203 8.93559 5.81804C9.20817 5.75709 9.44818 5.58127 9.60422 5.32824L12.2161 1"
                        stroke="#1DBF73"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.08496 1.64241L12.2165 1L12.8 4.44216"
                        stroke="#1DBF73"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="9"
                      viewBox="0 0 14 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.59961 1L4.20024 4.80274C4.36152 5.03583 4.59653 5.19393 4.8588 5.24578C5.11844 5.29993 5.38713 5.24597 5.61256 5.09441L8.14935 3.33456C8.38455 3.17212 8.66455 3.11797 8.93559 3.18196C9.20817 3.24291 9.44818 3.41873 9.60422 3.67176L12.2161 8"
                        stroke="#ED4C5C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.08496 7.35759L12.2165 8L12.8 4.55784"
                        stroke="#ED4C5C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </p>
                <p className={percentageChange > 0 ? "green" : "red"}>
                  <AnimatedNumber
                    targetValue={percentageChange.toFixed(1)}
                    duration={1000}
                  />
                  %
                </p>
              </div>
              <span>
                {language === "ge"
                  ? "წინა წელთან შედარებით"
                  : "than the previous year"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnergyConsumption;
