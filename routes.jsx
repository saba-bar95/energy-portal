// src/routes.js
import App from "./src/App";
import { Navigate } from "react-router-dom";
import Visualization from "./src/assets/components/Section/Sections/Visualization/Visualization";
import Statistics from "./src/assets/components/Section/Sections/Statistics/Statistics";
import Consumption from "./src/assets/components/Section/Sections/Consumption/Consumption";
import HomePage from "./src/assets/components/HomePage/HomePage";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />, // Redirect to /ka
  },
  {
    path: "/ka",
    element: <App />, // Use the App component as a layout
    children: [
      {
        path: "", // This will match /ka
        element: <HomePage />, // Render the home page when navigating to /ka
      },
      {
        path: "visualization", // No leading slash
        element: <Visualization />,
      },
      {
        path: "statistics", // No leading slash
        element: <Statistics />,
      },
      {
        path: "consumption", // No leading slash
        element: <Consumption />,
      },
    ],
  },
];

export default routes;
