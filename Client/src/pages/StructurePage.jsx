import { useState } from "react";
// import initialDepartments from "../data/initialDepartments";
import DepartmentCard from "../components/DepartmentCard";
import { useStructureMutation } from "../hooks/reactMutation";
import { saveStructure } from "../services/axiosAPI";
import { useGetCurrentUser } from "../hooks/reactQuery";
import Button from "@mui/material/Button";

const StructurePage = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [isUpdate, setIsUpdate] = useState(false);
  const changeStructure = useStructureMutation(saveStructure);

  const { data: currentUser } = useGetCurrentUser();

  const handleSaveStructure = () => {
    if (!currentUser || !currentUser.data) {
      console.error("Current user data is not available.");
      return;
    }

    const updatedBy = {
      userId: currentUser.data.id,
      name: currentUser.data.name,
      lastName: currentUser.data.lastName,
      userEmail: currentUser.data.email,
    };

    const changeReason = "Оновлення структури"; 
    const structureData = { data, updatedBy, changeReason };
    console.log("====================================");
    console.log(structureData, "structuredata");
    console.log("====================================");
    changeStructure.mutate(structureData, {
      onSuccess: (response) => {
        console.log("Structure saved successfully:", response);
      },
      onError: (error) => {
        console.error("Error saving structure:", error);
      },
    });
  };

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

    // localStorage.setItem("companyData", JSON.stringify(updatedDept));
    setData((prev) =>
      updateTree(prev, deptId, (node) => ({ ...node, ...updatedFields })),
    );
    setData(updatedDept);
    setIsUpdate(true);
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

      // localStorage.setItem("companyData", JSON.stringify(newDept));
      return newDept;
    };
    if (data.id === deptId) return;
    setData((prev) => removeFromTree(prev));
    setIsUpdate(true);
  };

  const handleAddSubDept = (parentId) => {
    const newDept = {
      id: `dept-${Date.now()}`,
      name: "Новий підрозділ",
      manager: null,
      staff: [],
      subDepartments: [],
    };
    // Якщо батьківського ID немає — це створення самого першого (головного) відділу
    if (!parentId || !data || !data.id) {
      setData(newDept);
      return;
    }
    const updatedDept = updateTree(data, parentId, (node) => ({
      ...node,
      subDepartments: [...(node.subDepartments || []), newDept],
    }));

    // localStorage.setItem("companyData", JSON.stringify(updatedDept));
    setData((prev) =>
      updateTree(prev, parentId, (node) => ({
        ...node,
        subDepartments: [...(node.subDepartments || []), newDept],
      })),
    );
    setIsUpdate(true);
    console.log(updatedDept, "updateTree node");
  };
  return (
    <>
      <div className="relative pb-60 flex justify-center py-20 px-10 overflow-auto">
        <DepartmentCard
          dept={data}
          onUpdateDept={handleUpdateDept}
          onDeleteDept={handleDeleteDept}
          onAddSubDept={handleAddSubDept}
        />
      </div>
      <Button
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          borderRadius: "12px",
          boxShadow: 4,
          backgroundColor: "#63e45f",
        }}
        disabled={!isUpdate}
        variant="contained"
        onClick={() => {
          handleSaveStructure();
        }}
      >
        Зберегти
      </Button>
    </>
  );
};

export default StructurePage;
