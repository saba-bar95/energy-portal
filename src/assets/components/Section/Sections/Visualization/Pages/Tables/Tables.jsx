import "./Tables.scss";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import links from "./links";

const Tables = () => {
  const { language } = useParams();
  const location = useLocation(); // Get current URL path

  // Determine selectedId dynamically based on the current URL
  const selectedId = links[language].links.find((link) =>
    location.pathname.includes(link.link)
  )?.id;

  return (
    <div className="tables">
      <div className="tables-wrapper">
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
    </div>
  );
};

export default Tables;
