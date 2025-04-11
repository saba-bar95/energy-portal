/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./YearDropdown.scss";

const YearDropdown = ({ years, year, setYear }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const [selectedYear, setSelectedYear] = useState(year); // Track the selected year

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    if (open) {
      const selectedElement =
        dropdownRef.current.querySelector(`.wrapper.selected`);
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "center", // Align the selected element in the center of the dropdown
        });
      }
    }
  }, [open, selectedYear]);

  return (
    <div className="years-container">
      <div
        className="heading"
        onClick={() => {
          handleToggle();
        }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 7.82049C1 5.11311 1 3.75906 1.8204 2.91834C2.6408 2.07762 3.9603 2.0769 6.6 2.0769H9.4C12.0397 2.0769 13.3599 2.0769 14.1796 2.91834C14.9993 3.75978 15 5.11311 15 7.82049V9.25639C15 11.9638 15 13.3178 14.1796 14.1585C13.3592 14.9993 12.0397 15 9.4 15H6.6C3.9603 15 2.6401 15 1.8204 14.1585C1.0007 13.3171 1 11.9638 1 9.25639V7.82049Z"
            stroke="black"
          />
          <path
            d="M4.49961 2.07692V1M11.4996 2.07692V1M1.34961 5.66667H14.6496"
            stroke="black"
            strokeLinecap="round"
          />
          <path
            d="M12.1998 11.4103C12.1998 11.6007 12.1261 11.7833 11.9948 11.918C11.8635 12.0526 11.6855 12.1282 11.4998 12.1282C11.3142 12.1282 11.1361 12.0526 11.0048 11.918C10.8736 11.7833 10.7998 11.6007 10.7998 11.4103C10.7998 11.2199 10.8736 11.0373 11.0048 10.9026C11.1361 10.768 11.3142 10.6924 11.4998 10.6924C11.6855 10.6924 11.8635 10.768 11.9948 10.9026C12.1261 11.0373 12.1998 11.2199 12.1998 11.4103ZM12.1998 8.53851C12.1998 8.72892 12.1261 8.91153 11.9948 9.04617C11.8635 9.18081 11.6855 9.25645 11.4998 9.25645C11.3142 9.25645 11.1361 9.18081 11.0048 9.04617C10.8736 8.91153 10.7998 8.72892 10.7998 8.53851C10.7998 8.34809 10.8736 8.16548 11.0048 8.03084C11.1361 7.8962 11.3142 7.82056 11.4998 7.82056C11.6855 7.82056 11.8635 7.8962 11.9948 8.03084C12.1261 8.16548 12.1998 8.34809 12.1998 8.53851ZM8.6998 11.4103C8.6998 11.6007 8.62605 11.7833 8.49478 11.918C8.3635 12.0526 8.18546 12.1282 7.9998 12.1282C7.81415 12.1282 7.63611 12.0526 7.50483 11.918C7.37355 11.7833 7.2998 11.6007 7.2998 11.4103C7.2998 11.2199 7.37355 11.0373 7.50483 10.9026C7.63611 10.768 7.81415 10.6924 7.9998 10.6924C8.18546 10.6924 8.3635 10.768 8.49478 10.9026C8.62605 11.0373 8.6998 11.2199 8.6998 11.4103ZM8.6998 8.53851C8.6998 8.72892 8.62605 8.91153 8.49478 9.04617C8.3635 9.18081 8.18546 9.25645 7.9998 9.25645C7.81415 9.25645 7.63611 9.18081 7.50483 9.04617C7.37355 8.91153 7.2998 8.72892 7.2998 8.53851C7.2998 8.34809 7.37355 8.16548 7.50483 8.03084C7.63611 7.8962 7.81415 7.82056 7.9998 7.82056C8.18546 7.82056 8.3635 7.8962 8.49478 8.03084C8.62605 8.16548 8.6998 8.34809 8.6998 8.53851ZM5.1998 11.4103C5.1998 11.6007 5.12605 11.7833 4.99478 11.918C4.8635 12.0526 4.68546 12.1282 4.4998 12.1282C4.31415 12.1282 4.13611 12.0526 4.00483 11.918C3.87355 11.7833 3.7998 11.6007 3.7998 11.4103C3.7998 11.2199 3.87355 11.0373 4.00483 10.9026C4.13611 10.768 4.31415 10.6924 4.4998 10.6924C4.68546 10.6924 4.8635 10.768 4.99478 10.9026C5.12605 11.0373 5.1998 11.2199 5.1998 11.4103ZM5.1998 8.53851C5.1998 8.72892 5.12605 8.91153 4.99478 9.04617C4.8635 9.18081 4.68546 9.25645 4.4998 9.25645C4.31415 9.25645 4.13611 9.18081 4.00483 9.04617C3.87355 8.91153 3.7998 8.72892 3.7998 8.53851C3.7998 8.34809 3.87355 8.16548 4.00483 8.03084C4.13611 7.8962 4.31415 7.82056 4.4998 7.82056C4.68546 7.82056 4.8635 7.8962 4.99478 8.03084C5.12605 8.16548 5.1998 8.34809 5.1998 8.53851Z"
            fill="black"
          />
        </svg>
        <h3>{year}</h3>

        {!open && (
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
        )}
        {open && (
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
        )}
      </div>

      {open && (
        <div className="dropdown-content" ref={dropdownRef}>
          {years
            .slice()
            .reverse()
            .map(
              (
                year,
                i // Reverse the years array
              ) => (
                <div
                  className={`wrapper ${
                    selectedYear === +year ? "selected" : ""
                  }`} // Add selected class
                  key={i}
                  onClick={() => {
                    setYear(+year);
                    setSelectedYear(+year); // Set the selected year
                    setOpen(false);
                  }}>
                  {selectedYear === +year ? (
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
                  <p>{year}</p>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
