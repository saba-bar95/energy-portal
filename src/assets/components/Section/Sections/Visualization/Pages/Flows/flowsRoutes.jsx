import { Navigate } from "react-router-dom";
import Production from "./Pages/Production/Production";
import Import from "./Pages/Import/Import";
import Export from "./Pages/Export/Export";
import FinalConsumption from "./Pages/FinalConsumption/FinalConsumption";

const flowsRoutes = [
  { path: "", element: <Navigate to="production" replace /> },
  {
    path: "production",
    element: <Production />,
  },
  {
    path: "import",
    element: <Import />,
  },
  {
    path: "export",
    element: <Export />,
  },
  {
    path: "finalconsumption",
    element: <FinalConsumption />,
  },
];

export default flowsRoutes;
