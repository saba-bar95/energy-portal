import { Link, Outlet, useParams } from "react-router-dom";
import text from "./text";
import { useState } from "react";

const Consumption = () => {
  const { language } = useParams();
  const [selectedId, setSelected] = useState(text[language].links[0].id);

  const handleLinkSelect = (id) => {
    setSelected(id);
  };

  return (
    <>
      <div className="consumption">
        <div className="container">
          <h1>{text[language].header}</h1>
          <div className="links">
            <ul>
              {text[language].links.map((link) => {
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

export default Consumption;
