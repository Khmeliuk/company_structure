import { useState, useEffect } from "react";
import DepartmentCard from "../components/DepartmentCard";
import { useStructureMutation } from "../hooks/reactMutation";
import { saveStructure } from "../services/axiosAPI";
import { useGetCurrentUser, useGetStructure } from "../hooks/reactQuery";
import Button from "@mui/material/Button";

const StructurePage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const changeStructure = useStructureMutation(saveStructure);

  const { data: currentUser } = useGetCurrentUser();
  const { data: structureData, isLoading } = useGetStructure();

  const structure = structureData?.data;

  // 1. Початковий стан
  const [companyStructure, setCompanyStructure] = useState(structure || null);
  const [newDept, setNewDept] = useState(null);

  console.log("====================================");
  console.log(companyStructure, "com;kljsaflkxajdl;akjd;lkaj");
  console.log("====================================");

  // 2. Синхронізуємо локальний стан з даними React Query після завантаження
  useEffect(() => {
    if (structure && !isUpdate) {
      setCompanyStructure(structure);
    }
  }, [structure, isUpdate]);

  const handleSaveStructure = () => {
    if (!currentUser || !currentUser.data) {
      console.error("Current user data is not available.");
      return;
    }

    const updatedBy = {
      userId: currentUser.data.userId,
      name: currentUser.data.name,
      lastName: currentUser.data.lastName,
      userEmail: currentUser.data.email,
    };

    const changeReason = "Оновлення структури";
    const payload = { data: companyStructure, updatedBy, changeReason };

    changeStructure.mutate(payload, {
      onSuccess: (response) => {
        console.log("Structure saved successfully:", response);
        setIsUpdate(false);
      },
      onError: (error) => {
        console.error("Error saving structure:", error);
      },
    });
  };

  // Рекурсивна функція для оновлення вузла
  const updateTree = (node, targetId, callback) => {
    console.log("====================================");
    console.log(targetId, "targetId");
    console.log("====================================");
    if (!node) return null;
    if (node.id === targetId) {
      return callback(node);
    }
    if (node.subDepartments) {
      console.log("====================================");
      console.log(
        {
          ...node,
          subDepartments: node.subDepartments.map((sub) =>
            updateTree(sub, targetId, callback),
          ),
        },
        "updateTree",
      );
      console.log("====================================");
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
    console.log("====================================");
    console.log(deptId, updatedFields, "handleUpdateDept");
    console.log("====================================");

    setCompanyStructure((prev) =>
      updateTree(prev, deptId, (node) => ({ ...node, ...updatedFields })),
    );
    setIsUpdate(true);
  };

  const handleDeleteDept = (deptId) => {
    const removeFromTree = (node) => {
      if (!node || !node.subDepartments) return node;
      return {
        ...node,
        subDepartments: node.subDepartments
          .filter((sub) => sub.id !== deptId)
          .map(removeFromTree),
      };
    };

    // Якщо намагаємося видалити самий перший (кореневий) відділ
    if (companyStructure?.id === deptId) {
      setCompanyStructure(null);
      setIsUpdate(true);
      return;
    }

    setCompanyStructure((prev) => removeFromTree(prev));
    setIsUpdate(true);
  };

  const handleAddSubDept = (parentId) => {
    const newDept = {
      _id: `dept-${Date.now()}`,
      name: "Новий підрозділ",
      manager: null,
      staff: [],
      subDepartments: [],
    };

    // Створення найпершого кореневого відділу (якщо структура порожня)
    if (!parentId || !companyStructure || !companyStructure._id) {
      setCompanyStructure(newDept);
      setIsUpdate(true);
      return;
    }
    console.log("====================================");
    console.log("handleAddSubDept");
    console.log("====================================");
    setNewDept();
    setCompanyStructure((prev) =>
      updateTree(prev, parentId, (node) => ({
        ...node,
        subDepartments: [...(node.subDepartments || []), newDept],
      })),
    );

    setCompanyStructure((prev) =>
      updateTree(prev, parentId, (node) => ({
        ...node,
        subDepartments: [...(node.subDepartments || []), newDept],
      })),
    );
    setIsUpdate(true);
  };

  if (isLoading)
    return <div className="p-10 text-center">Завантаження структури...</div>;

  return (
    <>
      <div className="relative pb-60 flex justify-center py-20 px-10 overflow-auto">
        {
          <DepartmentCard
            dept={companyStructure}
            onUpdateDept={handleUpdateDept}
            onDeleteDept={handleDeleteDept}
            onAddSubDept={handleAddSubDept}
          />
        }
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
          "&:hover": {
            backgroundColor: "#4bc647",
          },
        }}
        disabled={!isUpdate || changeStructure.isPending}
        variant="contained"
        onClick={handleSaveStructure}
      >
        {changeStructure.isPending ? "Збереження..." : "Зберегти"}
      </Button>
    </>
  );
};

export default StructurePage;
