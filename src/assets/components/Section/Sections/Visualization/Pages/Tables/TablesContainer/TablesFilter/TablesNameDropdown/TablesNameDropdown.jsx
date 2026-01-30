/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./TablesNameDropdown.scss";
import { useParams } from "react-router-dom";

const TablesNameDropdown = ({ name, names, setName, setParentOpen }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedName, setSelectedName] = useState(name);

  const { language } = useParams();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Deduplicate names by their "name" property (trimmed to avoid \r\n issues)
  const uniqueNames = Array.from(
    new Set(names.map((item) => item.name.trim())),
  ).map((uniqueName) => names.find((item) => item.name.trim() === uniqueName));

  useEffect(() => {
    if (open) {
      const selectedElement =
        dropdownRef.current.querySelector(`.wrapper.selected`);
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [open, selectedName]);

  return (
    <div className="names-years-container">
      <div
        className="heading"
        onClick={() => {
          handleToggle();
        }}>
        <h3>
          {selectedName ||
            (language === "ge" ? "აირჩიეთ სახელი" : "Choose name")}
        </h3>

        {!open && (
          <div className="svg-wrapper">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.54025 5.54025C5.3994 5.68106 5.20839 5.76016 5.00923 5.76016C4.81007 5.76016 4.61906 5.68106 4.47821 5.54025L0.229299 1.29134C0.157562 1.22205 0.100342 1.13917 0.0609786 1.04754C0.0216147 0.955903 0.000894977 0.857345 2.83584e-05 0.757616C-0.00083826 0.657887 0.0181658 0.558984 0.0559312 0.466678C0.0936966 0.374372 0.149467 0.290511 0.219989 0.219989C0.290511 0.149467 0.374371 0.0936963 0.466677 0.0559308C0.558983 0.0181654 0.657887 -0.00083826 0.757616 2.83589e-05C0.857345 0.000894978 0.955903 0.0216147 1.04754 0.0609786C1.13917 0.100342 1.22205 0.157562 1.29134 0.229298L5.00923 3.94719L8.72712 0.229298C8.86878 0.0924815 9.0585 0.016776 9.25544 0.0184873C9.45237 0.0201986 9.64075 0.0991896 9.78001 0.238448C9.91927 0.377706 9.99826 0.566088 9.99997 0.763022C10.0017 0.959955 9.92598 1.14968 9.78916 1.29134L5.54025 5.54025Z"
                fill="#6F6F6F"
              />
            </svg>
          </div>
        )}
        {open && (
          <div className="svg-wrapper">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.45975 0.220005C4.6006 0.0791969 4.79161 9.58658e-05 4.99077 9.58832e-05C5.18993 9.59006e-05 5.38094 0.079197 5.52179 0.220005L9.7707 4.46892C9.84244 4.5382 9.89966 4.62108 9.93902 4.71272C9.97839 4.80435 9.99911 4.90291 9.99997 5.00264C10.0008 5.10237 9.98183 5.20127 9.94407 5.29358C9.9063 5.38588 9.85053 5.46974 9.78001 5.54027C9.70949 5.61079 9.62563 5.66656 9.53332 5.70432C9.44102 5.74209 9.34211 5.76109 9.24238 5.76023C9.14266 5.75936 9.0441 5.73864 8.95246 5.69928C8.86083 5.65991 8.77795 5.60269 8.70866 5.53096L4.99077 1.81306L1.27288 5.53095C1.13122 5.66777 0.941496 5.74348 0.744562 5.74177C0.547629 5.74005 0.359247 5.66106 0.219989 5.52181C0.0807305 5.38255 0.0017386 5.19416 2.77233e-05 4.99723C-0.00168315 4.8003 0.0740224 4.61057 0.210838 4.46891L4.45975 0.220005Z"
                fill="#6F6F6F"
              />
            </svg>
          </div>
        )}
      </div>

      {open && (
        <div className="dropdown-content" ref={dropdownRef}>
          {uniqueNames.map((item, i) => {
            return (
              <div
                className={`wrapper ${
                  selectedName === item.name.trim() ? "selected" : ""
                }`}
                key={i}
                onClick={() => {
                  if (selectedName === item.name.trim()) {
                    setName(null);
                    setSelectedName(null);
                    setParentOpen(false);
                  } else {
                    setName(item.name.trim());
                    setSelectedName(item.name.trim());
                    setParentOpen(false);
                  }
                  setOpen(false);
                }}>
                {selectedName === item.name.trim() ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="0.3"
                      y="0.3"
                      width="15.4"
                      height="15.4"
                      rx="3.7"
                      fill="#08A14F"
                      stroke="#08A14F"
                      strokeWidth="0.6"
                    />
                    <path
                      d="M12.304 5.33325L7.06422 10.6666L4.44434 7.99992"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="0.3"
                      y="0.3"
                      width="15.4"
                      height="15.4"
                      rx="3.7"
                      stroke="#A0A0A0"
                      strokeWidth="0.6"
                    />
                  </svg>
                )}
                <p>{item.name.trim()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TablesNameDropdown;
