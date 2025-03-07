// src/routes.js
import App from "./src/App";
import { Navigate } from "react-router-dom";
import Visualization from "./src/assets/components/Section/Sections/Visualization/Visualization";
import Statistics from "./src/assets/components/Section/Sections/Statistics/Statistics";
import Consumption from "./src/assets/components/Section/Sections/Consumption/Consumption";
import HomePage from "./src/assets/components/HomePage/HomePage";
import LanguageCheck from "./LanguageCheck";
import ErrorPage from "./src/assets/components/ErrorPage/ErrorPage";
import consumptionRoutes from "./src/assets/components/Section/Sections/Consumption/consumptionRoutes";
import visualizationRoutes from "./src/assets/components/Section/Sections/Visualization/visualizationRoutes";

const routes = [
  { path: "/", element: <Navigate to="/ka" replace /> }, // Redirect to /ka
  {
    path: "/:language",
    element: (
      <LanguageCheck>
        <App />
      </LanguageCheck>
    ),
    children: [
      { path: "", element: <HomePage /> }, // Render home page
      {
        path: "visualization",
        element: <Visualization />,
        children: visualizationRoutes,
      },
      { path: "statistics", element: <Statistics /> },
      {
        path: "consumption",
        element: <Consumption />,
        children: consumptionRoutes, // Use the defined consumption routes
      },
    ],
  },
  { path: "*", element: <ErrorPage /> }, // Catch-all for errors
];

export default routes;
