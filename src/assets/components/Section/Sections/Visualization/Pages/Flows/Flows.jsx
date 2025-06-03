import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import links from "./links";

const Flows = () => {
  const { language } = useParams();
  const location = useLocation(); // Get current URL path

  // Dynamically determine selectedId based on current URL
  const selectedId = links[language].links.find((link) =>
    location.pathname.includes(link.link)
  )?.id;

  return (
    <div className="resources-container">
      <div className="links flows-links">
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
  );
};

export default Flows;
