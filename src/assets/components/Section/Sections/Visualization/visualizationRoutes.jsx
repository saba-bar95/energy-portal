import { Navigate } from "react-router-dom";
import Resources from "../Visualization/Pages/Resources/Resources";
import Flows from "./Pages/Flows/Flows";
import Indicators from "../Visualization/Pages/Indicators/Indicators";
import Tables from "../Visualization/Pages/Tables/Tables";
import Diagram from "../Visualization/Pages/Diagram/Diagram";
import resourcesRoutes from "./Pages/Resources/resourcesRoutes";
import flowsRoutes from "./Pages/Flows/flowsRoutes";

const consumptionRoutes = [
  { path: "", element: <Navigate to="resources" replace /> }, // Default to heating
  { path: "resources", element: <Resources />, children: resourcesRoutes },
  { path: "flows", element: <Flows />, children: flowsRoutes },
  { path: "indicators", element: <Indicators /> },
  { path: "tables", element: <Tables /> },
  { path: "diagram", element: <Diagram /> },
];

export default consumptionRoutes;
