import { Navigate } from "react-router-dom";
import Production from "./Pages/Production/Production";
import Imports from "./Pages/Imports/Imports";
import Exports from "./Pages/Exports/Exports";
import FinalConsumption from "./Pages/FinalConsumption/FinalConsumption";

const flowsRoutes = [
  { path: "", element: <Navigate to="production" /> },
  {
    path: "production",
    element: <Production />,
  },
  {
    path: "imports",
    element: <Imports />,
  },
  {
    path: "exports",
    element: <Exports />,
  },
  {
    path: "finalconsumption",
    element: <FinalConsumption />,
  },
];

export default flowsRoutes;
