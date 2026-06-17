import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isUserLoggedIn } = useContext(authContext);

  return isUserLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
