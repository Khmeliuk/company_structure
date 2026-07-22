import mongoose from 'mongoose';

// 1. Схема для співробітників (staff)
const staffSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true },
    phone: { type: String, required: true },
    hasCar: { type: Boolean, default: false },
    carInfo: { type: String },
    photo: { type: String },
    notes: [{ type: String }],
  },

);

// 2. Схема для керівників (manager)
const managerSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true },
    phone: { type: String, required: true },
    hasCar: { type: Boolean, default: false },
    carInfo: { type: String },
    photo: { type: String },
    notes: [{ type: String }],
  },

);

// 3. Рекурсивна схема відділів (Department)
const departmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    manager: { type: managerSchema, required: true },
    staff: [staffSchema],
  
    subDepartments: [],
  },
  {
    timestamps: true, 
  }
);

// Оголошуємо масив subDepartments через add(), щоб схема посилалася сама на себе
departmentSchema.add({
  subDepartments: [departmentSchema],
});

export const Department = mongoose.model('Department', departmentSchema);