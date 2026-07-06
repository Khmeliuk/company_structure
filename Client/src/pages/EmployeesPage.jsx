import { useState } from "react";
import initialDepartments from "../data/initialDepartments";
import EmployerStructure from "../components/EmployerStructure";

const EmployeesPage = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || initialDepartments);
  return <EmployerStructure data={data} />;
};

export default EmployeesPage;
