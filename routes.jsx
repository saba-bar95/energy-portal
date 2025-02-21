// src/routes.js
import App from "./src/App";
import { Navigate } from "react-router-dom";
import Visualization from "./src/assets/components/Section/Sections/Visualization/Visualization";
import Statistics from "./src/assets/components/Section/Sections/Statistics/Statistics";
import Consumption from "./src/assets/components/Section/Sections/Consumption/Consumption";
import HomePage from "./src/assets/components/HomePage/HomePage";
import LanguageCheck from "./LanguageCheck";
import ErrorPage from "./src/assets/components/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />, // Redirect to /ka
  },
  {
    path: "/:language", // Use a dynamic segment for language
    element: (
      <LanguageCheck>
        <App />
      </LanguageCheck>
    ),
    children: [
      {
        path: "", // This will match /ka or /en
        element: <HomePage />, // Render the home page when navigating to /ka or /en
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
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
