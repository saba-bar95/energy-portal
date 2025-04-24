/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./TablesFilter.scss";
import svg from "./Svg";
import chartYears from "../../../../../../../../../../chartYears";
import TablesYearDropdown from "./TablesYearDropdown/TablesYearDropdown";
import TablesNameDropdown from "./TablesNameDropdown/TablesNameDropdown";

const TablesFilter = ({
  year,
  setYear,
  unit,
  setUnit,
  name,
  names,
  setName,
}) => {
  const { language } = useParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleUnitClick = (index) => {
    setUnit(index); // Update the selected unit
    setOpen(false); // Close the dropdown
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the parent
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close the dropdown
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const isOpen = open ? "open" : "";

  const text = {
    ge: {
      filter: "ფილტრი",
      year: "წელი",
      units: ["ტჯ", "ტნე", "1000 ტ."],
      name: "საერთო სახელი",
    },

    en: {
      filter: "Filter",
      year: "Year",
      units: ["tj", "ktoe", "1000 tones"],
      name: "Name",
    },
  };

  return (
    <div
      className={`table-filter ${isOpen}`}
      onClick={handleToggle}
      ref={dropdownRef}>
      <p>{svg()}</p>
      <p>{text[`${language}`].filter}</p>
      {open && (
        <div className="dropdown-content" onClick={handleDropdownClick}>
          <div className="unit-section">
            {text[`${language}`].units.map((el, i) => (
              <p
                key={i}
                onClick={() => handleUnitClick(i)} // Add click handler
                className={unit === i ? "selected" : ""} // Apply selected class
              >
                {el}
              </p>
            ))}
          </div>
          <div className="name-section">
            <h3>{text[`${language}`].name} </h3>
            <TablesNameDropdown
              name={name}
              names={names}
              setName={setName}
              setParentOpen={setOpen}
            />
          </div>
          <div className="year-section">
            <h3>{text[`${language}`].year} </h3>
            <TablesYearDropdown
              years={chartYears}
              setYear={setYear}
              year={year}
              setParentOpen={setOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TablesFilter;
