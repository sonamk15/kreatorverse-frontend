import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Product from "./pages/Products";
import Vendors from "./pages/Venders";
import CreateVender from "./pages/CreateVender/index.";
import CreateProduct from "./pages/CreateProduct";

const authRoutes = (authToken, role) => [
  {
    path: "/",
    element: authToken ? (
      <Navigate to="/dashboard/product" replace />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/dashboard/product",
    element: <Product />,
  },
  {
    path: "/dashboard/vender",
    element: <Vendors />,
  },
  {
    path: "/dashboard/create-vender",
    element: <CreateVender />,
  },
  {
    path: "/dashboard/create-product",
    element: <CreateProduct />,
  },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" /> },
];

export default authRoutes;
