/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Filter.scss";
import svg from "./Svg";

const Filter = ({ vatID, setVatID, vats }) => {
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
      name: "საერთო სახელი",
      vat: "დღგ",
    },

    en: {
      filter: "Filter",
      name: "Name",
      vat: "VAT",
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
          <div className="vat-section">
            <h3>{text[`${language}`].vat} </h3>
            {vats.map((el) => {
              console.log(el);
            })}
          </div>
          {/* <div className="unit-section"></div>
          <div className="name-section">
            <h3>{text[`${language}`].name} </h3>
          </div> */}
          <div className="year-section"></div>
        </div>
      )}
    </div>
  );
};

export default Filter;
