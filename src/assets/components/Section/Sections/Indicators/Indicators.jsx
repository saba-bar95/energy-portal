import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import links from "./links";
import "./Indicators.scss";

const Indicators = () => {
  const { language } = useParams();
  const location = useLocation(); // Get current URL path

  // Dynamically determine selectedId based on the current URL
  const selectedId = links[language].links.find((link) =>
    location.pathname.includes(link.link)
  )?.id;

  return (
    <>
      <div className="indicators">
        <div className="container">
          <h1>{links[language].header}</h1>
        </div>
        <div className="links">
          <ul>
            {links[language].links.map((link) => (
              <Link key={link.id} to={link.link}>
                <div className="wrapper">
                  <li className={selectedId === link.id ? "selected" : ""}>
                    {link.svg}
                    {link.name}
                  </li>
                </div>
              </Link>
            ))}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Indicators;
