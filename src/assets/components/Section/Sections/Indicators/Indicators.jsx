import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import links from "./links";
import "./Indicators.scss";

const Indicators = () => {
  const { language } = useParams();
  const [selectedId, setSelected] = useState(links[language].links[0].id);

  const handleLinkSelect = (id) => {
    setSelected(id);
  };

  return (
    <>
      <div className="indicators">
        <div className="container">
          <h1>{links[language].header}</h1>
        </div>
        <div className="links">
          <ul>
            {links[language].links.map((link) => {
              return (
                <Link key={link.id} to={link.link}>
                  <div className="wrapper" key={link.id}>
                    <li
                      onClick={() => {
                        handleLinkSelect(link.id);
                      }}
                      className={selectedId === link.id ? "selected" : ""}>
                      {link.svg}
                      {link.name}
                    </li>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Indicators;
