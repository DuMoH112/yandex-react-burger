import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const { isAuth } = useSelector((store) => store.user);
  let location = useLocation();

  if (!isAuth)
    return <Navigate to="/login" exact={true} state={{ from: location }} />;

  return <Outlet />;
};

export default RequireAuth;
