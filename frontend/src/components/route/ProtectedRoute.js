import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function ProtectedRoute({ children }) {
  //this is a parent component(ProtetedRoute) so can get elemnet as children
  const { isAuthenticated, loading } = useSelector((state) => state.authState);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />; //can be used as js element
  }

  if (isAuthenticated) {
    return children;
  }

  if (loading) {
    return <Loader />;
  }
}
