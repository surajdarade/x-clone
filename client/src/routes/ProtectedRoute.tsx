import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { UserState } from "../store/userSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((store: { user: UserState }) => store.user);

  return <>{!user ? <Navigate to="/signin" /> : children}</>;
};

export default ProtectedRoute;
