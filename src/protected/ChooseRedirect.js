import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ChooseRedirect({ children }) {
  const goSignUpPage = useSelector((state) => state.user.goSignUpPage);
  if (goSignUpPage) {
    return <Navigate to="/selectusername" />;
  }
  return children;
}
