import Resources from "../Visualization/Pages/Resources/Resources";
import Flows from "./Pages/Flows/Flows";
import Indicators from "../Visualization/Pages/Indicators/Indicators";
import Tables from "../Visualization/Pages/Tables/Tables";
import Diagram from "../Visualization/Pages/Diagram/Diagram";
import resourcesRoutes from "./Pages/Resources/resourcesRoutes";
import flowsRoutes from "./Pages/Flows/flowsRoutes";
import tableRoutes from "./Pages/Tables/tablesRoutes";
import { Navigate } from "react-router-dom";

const visualizationRoutes = [
  { index: true, element: <Navigate to="resources" replace /> }, // ✅ Redirects
  { path: "resources", element: <Resources />, children: resourcesRoutes },
  { path: "flows", element: <Flows />, children: flowsRoutes },
  { path: "indicators", element: <Indicators /> },
  { path: "tables", element: <Tables />, children: tableRoutes },
  { path: "diagram", element: <Diagram /> },
];

export default visualizationRoutes;
