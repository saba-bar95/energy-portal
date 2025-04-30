/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Filter.scss";
import svg from "./Svg";

const Filter = ({ vatID, setVatID, vats, typeID, setTypeID, types }) => {
  const { language } = useParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleVatClick = (num) => {
    setVatID(num);
    setOpen(false); // Close the dropdown
  };

  const handleTypeClick = (num) => {
    setTypeID(num);
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
      type: "ტიპი",
    },

    en: {
      filter: "Filter",
      name: "Name",
      vat: "VAT",
      type: "Type",
    },
  };

  return (
    <div
      className={`table-filter-1 ${isOpen}`}
      onClick={handleToggle}
      ref={dropdownRef}>
      <p>{svg()}</p>
      <p>{text[`${language}`].filter}</p>
      {open && (
        <div className="dropdown-content" onClick={handleDropdownClick}>
          <div className="vat-section section">
            <h3>{text[`${language}`].vat}</h3>
            <div className="wrapper">
              {vats.map((el) => (
                <div
                  className="carry"
                  key={el.number}
                  onClick={() => handleVatClick(el.number)}>
                  {vatID === el.number ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="white"
                        stroke="#138C00"
                        strokeWidth="4"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="8"
                        cy="8"
                        r="7.5"
                        fill="white"
                        stroke="#A0A0A0"
                      />
                    </svg>
                  )}
                  <p>{el.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="vat-section section">
            <h3>{text[`${language}`].type}</h3>
            <div className="wrapper">
              {types.map((el) => (
                <div
                  className="carry"
                  key={el.number}
                  onClick={() => handleTypeClick(el.number)}>
                  {typeID === el.number ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="white"
                        stroke="#138C00"
                        strokeWidth="4"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="8"
                        cy="8"
                        r="7.5"
                        fill="white"
                        stroke="#A0A0A0"
                      />
                    </svg>
                  )}
                  <p>{el.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="unit-section section"></div>
          <div className="name-section">
            <h3>{text[`${language}`].name} </h3>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Filter;
