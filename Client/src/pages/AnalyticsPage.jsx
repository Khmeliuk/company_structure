import Analytics from "../components/Analytics";
import { useGetCurrentUser } from "../hooks/reactQuery";
// import data from "../data/initialDepartments";
const AnalyticsPage = ({ data: initialData }) => {
  const { data } = useGetCurrentUser();
  return <Analytics data={initialData || data} />;
};
export default AnalyticsPage;
