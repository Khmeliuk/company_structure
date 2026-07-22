
import MainLayout from "./MainLayout";
import ProtectedRoute from "../components/ProtectedRoute"

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
};
export default ProtectedLayout;
