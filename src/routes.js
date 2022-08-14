import { Navigate } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import AuthLayout from "./component/AuthLayout";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Login from "./pages/Auth/Login";
const routes = (authToken, role) => [
  {
    path: "/",
    element: authToken ? (
      <Navigate to="/app/dashboard" replace />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/login",
    element: <Login />
  },
];

export default routes;
