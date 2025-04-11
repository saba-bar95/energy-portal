/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import "./TablesContainer.scss";
import TablesFilter from "./TablesFilter/TablesFilter";
import TableDownloadBtn from "./TableDownloadBtn/TableDownloadBtn";

const TablesContainer = ({ info }) => {
  const { language } = useParams();

  return (
    <div className="tables-container">
      <div className="header">
        <h1>{info.text[`${language}`].header} </h1>
        <div className="wrapper">
          <TablesFilter />
          <TableDownloadBtn />
        </div>
      </div>
    </div>
  );
};

export default TablesContainer;
