import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes";

const App = () => {
  const { authToken, role } = useSelector((state) => state.auth);
  const content = useRoutes(routes(authToken, role));

  return <>{content}</>;
};

export default App;
