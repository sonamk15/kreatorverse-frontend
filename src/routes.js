import { Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";

const routes = (authToken, role) => [
  {
    path: "/",
    element: authToken ? (
      <Navigate to="/dashboard/product" replace />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <Navigate to="/404" /> }
];

export default routes;
