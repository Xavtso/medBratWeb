import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";
import Loading from "../Loading";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
