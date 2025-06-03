import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import links from "./links";

const Visualization = () => {
  const { language } = useParams();
  const location = useLocation(); // Get current URL path

  // Determine selectedId based on the current URL
  const selectedId = links[language].links.find((link) =>
    location.pathname.includes(link.link)
  )?.id;

  return (
    <>
      <div className="visualization">
        <div className="container">
          <h1>{links[language].header}</h1>
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
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Visualization;
