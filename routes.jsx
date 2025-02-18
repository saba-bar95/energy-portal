import App from "./src/App";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />, // Redirect to /ka
  },
  {
    path: "/ka",
    element: <App />, // Your main app component
  },
  {
    path: "/en",
    element: <App />, // You can use the same component or a different one for /en
  },
];

export default routes;
