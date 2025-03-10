import { Navigate } from "react-router-dom";
import Resources from "../Visualization/Pages/Resources/Resources";
import Streams from "../Visualization/Pages/Streams/Streams";
import Indicators from "../Visualization/Pages/Indicators/Indicators";
import Tables from "../Visualization/Pages/Tables/Tables";
import Diagram from "../Visualization/Pages/Diagram/Diagram";
import resourcesRoutes from "./Pages/Resources/resourcesRoutes";

const consumptionRoutes = [
  { path: "", element: <Navigate to="resources" replace /> }, // Default to heating
  { path: "resources", element: <Resources />, children: resourcesRoutes },
  { path: "streams", element: <Streams /> },
  { path: "indicators", element: <Indicators /> },
  { path: "tables", element: <Tables /> },
  { path: "diagram", element: <Diagram /> },
];

export default consumptionRoutes;
