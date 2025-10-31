/* eslint-disable react/prop-types */
import "./Download.scss";
import { useState, useRef, useEffect } from "react";
import downloadPNG from "./downloadPNG";
import downloadJPG from "./downloadJPG";
import downloadExcel from "./downloadExcel";
import downloadPDF from "./downloadPDF";
import { useParams } from "react-router-dom";
import Dots from "./Svgs/Dots";
import Excel from "./Svgs/Excel";
import PDF from "./Svgs/PDF";
import JPG from "./Svgs/JPG";
import PNG from "./Svgs/PNG";

const Download = ({
  isTreeMap,
  data,
  filename,
  unit,
  year,
  isMonth,
  resource,
  isFilter,
  isSankey,
  isConditioning,
  isFiltered,
  twoFixed,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { language } = useParams();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".svg-container")) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper: Run download + close dropdown
  const downloadAndClose = (downloadFn) => {
    downloadFn();
    setOpen(false);
  };

  const selected = open ? "selected" : "";

  return (
    <div className="download-container">
      <div
        className={`svg-container ${selected}`}
        onClick={(event) => {
          event.stopPropagation();
          handleToggle();
        }}>
        <Dots />
      </div>

      {open && (
        <div className="dropdown-content" ref={dropdownRef}>
          <div className="upper">
            {/* Excel */}
            <div
              className="wrapper"
              onClick={() => {
                downloadExcel(
                  data,
                  filename,
                  language,
                  unit,
                  year,
                  isMonth,
                  resource,
                  isFilter,
                  isTreeMap,
                  isSankey,
                  isConditioning,
                  isFiltered,
                  twoFixed
                );
                setOpen(false);
              }}>
              <Excel />
              <p>Excel</p>
            </div>

            {/* PDF */}
            <div
              className="wrapper"
              onClick={() => {
                downloadPDF(
                  data,
                  filename,
                  language,
                  unit,
                  year,
                  isMonth,
                  resource,
                  isFilter,
                  isTreeMap,
                  isSankey,
                  isConditioning,
                  isFiltered,
                  twoFixed
                );
                setOpen(false);
              }}>
              <PDF />
              <p>PDF</p>
            </div>
          </div>

          <div className="divider" />

          <div className="lower">
            {/* JPG */}
            <div
              className="wrapper"
              onClick={() => downloadAndClose(downloadJPG)}>
              <JPG />
              <p>JPG</p>
            </div>

            {/* PNG */}
            <div
              className="wrapper"
              onClick={() => downloadAndClose(downloadPNG)}>
              <PNG />
              <p>PNG</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Download;
