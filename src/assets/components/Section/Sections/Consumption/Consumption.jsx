import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import links from "./links";

const Consumption = () => {
  const { language } = useParams();
  const location = useLocation(); // Get current URL path

  // Dynamically determine selectedId based on the current URL
  const selectedId = links[language].links.find((link) => {
    const currentPathSegments = location.pathname.split("/");
    const linkPathSegments = link.link.split("/");

    return (
      currentPathSegments.slice(-linkPathSegments.length).join("/") ===
      link.link
    );
  })?.id;

  return (
    <>
      <div className="visualization consumption">
        <div className="container">
          <h1>
            {links[language].header}
            <span>(2022)</span>
          </h1>
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

export default Consumption;
