import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import links from "./links";

const Statistics = () => {
  const { language } = useParams();
  const [selectedId, setSelected] = useState(links[language].links[0].id);

  const handleLinkSelect = (id) => {
    setSelected(id);
  };

  return (
    <>
      <div className="statistics">
        <div className="container">
          <h1>{links[language].header}</h1>
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
                        {link.name}
                      </li>
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Statistics;
