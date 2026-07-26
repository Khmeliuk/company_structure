import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manager: { type: Object, required: true },
    staff: { type: Array, default: [] },
    subDepartments: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const Department = mongoose.model('Department', departmentSchema);