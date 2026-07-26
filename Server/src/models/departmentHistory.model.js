import mongoose from "mongoose";

const departmentHistorySchema = new mongoose.Schema(
  {
    // Хто вніс зміни (користувач із вашої системи авторизації)
    updatedBy: {
      userId: { type: String, required: true },
      userName: { type: String, required: true },
      userEmail: { type: String },
    },
    // Короткий опис або коментар до правки (опціонально)
    changeReason: { type: String, default: "Оновлення структури" },
    // Збережена повна копія структури на момент перед зміною
    snapshot: { type: Object, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // зберігаємо точний час збереження версії
  },
);

export const DepartmentHistory = mongoose.model(
  "DepartmentHistory",
  departmentHistorySchema,
);
