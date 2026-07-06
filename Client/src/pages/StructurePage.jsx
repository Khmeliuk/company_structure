import { useState } from "react";
import initialDepartments from "../data/initialDepartments";
import DepartmentCard from "../components/DepartmentCard";

const EmployeesPage = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || initialDepartments);

  const updateTree = (node, targetId, callback) => {
    if (node.id === targetId) {
      const updatedNode = callback(node);
      return updatedNode;
    }
    if (node.subDepartments) {
      return {
        ...node,
        subDepartments: node.subDepartments.map((sub) =>
          updateTree(sub, targetId, callback),
        ),
      };
    }
    return node;
  };

  const handleUpdateDept = (deptId, updatedFields) => {
    const updatedDept = updateTree(data, deptId, (node) => ({
      ...node,
      ...updatedFields,
    }));
    localStorage.setItem("companyData", JSON.stringify(updatedDept));
    setData((prev) =>
      updateTree(prev, deptId, (node) => ({ ...node, ...updatedFields })),
    );
  };

  const handleDeleteDept = (deptId) => {
    const removeFromTree = (node) => {
      if (!node.subDepartments) return node;
      const newDept = {
        ...node,
        subDepartments: node.subDepartments
          .filter((sub) => sub.id !== deptId)
          .map(removeFromTree),
      };
      localStorage.setItem("companyData", JSON.stringify(newDept));
      return newDept;
    };
    if (data.id === deptId) return;
    setData((prev) => removeFromTree(prev));
  };

  const handleAddSubDept = (parentId) => {
    const newDept = {
      id: `dept-${Date.now()}`,
      name: "Новий підрозділ",
      manager: null,
      staff: [],
      subDepartments: [],
    };
    const updatedDept = updateTree(data, parentId, (node) => ({
      ...node,
      subDepartments: [...(node.subDepartments || []), newDept],
    }));
    localStorage.setItem("companyData", JSON.stringify(updatedDept));
    setData((prev) =>
      updateTree(prev, parentId, (node) => ({
        ...node,
        subDepartments: [...(node.subDepartments || []), newDept],
      })),
    );
  };
  return (
    <div className="relative pb-60 flex justify-center py-20 px-10 overflow-auto">
      <DepartmentCard
        dept={data}
        onUpdateDept={handleUpdateDept}
        onDeleteDept={handleDeleteDept}
        onAddSubDept={handleAddSubDept}
      />
    </div>
  );
};

export default EmployeesPage;
