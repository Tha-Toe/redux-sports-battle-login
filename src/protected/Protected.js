import { Navigate } from "react-router-dom";
import LoadingSpinner from "../component/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
export default function Protected({ children }) {
  const user = useSelector((state) => state.user.user);
  const checking = useSelector((state) => state.user.checking);
  if (checking) {
    return <LoadingSpinner />;
  } else if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
