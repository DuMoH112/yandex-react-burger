import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { IUser } from "../utils/interfaces";

const RequireAuth = () => {
  const { isAuth } = useSelector((store: {user: IUser}) => store.user);
  let location = useLocation();

  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
};

export default RequireAuth;
