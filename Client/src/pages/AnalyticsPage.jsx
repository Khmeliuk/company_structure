import Analytics from "../components/Analytics";
import data from "../data/initialDepartments";
const AnalyticsPage = ({ data: initialData }) => {
  return <Analytics data={initialData || data} />;
};
export default AnalyticsPage;
