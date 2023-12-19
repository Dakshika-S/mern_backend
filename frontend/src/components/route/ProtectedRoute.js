import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  //this is a parent component(ProtetedRoute) so can get elemnet as children
  const { isAuthenticated } = useSelector((state) => state.authState);

  if (!isAuthenticated) {
    return <Navigate to="/login" />; //can be used as js element
  }

  return children;
}
