import { z } from "zod";

// 1. Схема працівника (Staff)
export const staffSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    position: z.string().trim().min(1, "Position is required"),
    phone: z.string().trim().min(1, "Phone is required"),
    hasCar: z.boolean().default(false),
    carInfo: z.string().trim().optional(),
    photo: z.string().url("Invalid photo URL").optional(),
    notes: z.array(z.string()).default([]),
  })
  .strip();

// 2. Схема керівника (Manager)
export const managerSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    position: z.string().trim().min(1, "Position is required"),
    phone: z.string().trim().min(1, "Phone is required"),
    hasCar: z.boolean().default(false),
    carInfo: z.string().trim().optional(),
    photo: z.string().url("Invalid photo URL").optional(),
    notes: z.array(z.string()).default([]),
  })
  .strip();

// 3. Базові поля відділу без рекурсії
const departmentCoreShape = {
  name: z.string().trim().min(1, "Department name is required"),
  manager: managerSchema,
  staff: z.array(staffSchema).default([]),
};

// 4. Повна схема для POST
export const departmentSchema = z
  .object({
    ...departmentCoreShape,
    subDepartments: z.array(z.lazy(() => departmentSchema)).default([]),
  })
  .strip();

export const createDepartmentInputSchema = departmentSchema;

// 5. Виправлена схема для PATCH (робимо частковими базові поля та рекурсивну частину)
export const updateDepartmentInputSchema = z
  .object({
    ...departmentCoreShape,
  })
  .partial() // робить name, manager, staff необов'язковими
  .extend({
    manager: managerSchema.partial().optional(), // робить поля всередині manager необов'язковими
    staff: z.array(staffSchema.partial()).optional(),
    subDepartments: z.array(z.lazy(() => updateDepartmentInputSchema)).optional(), // рекурсивний PATCH
  })
  .strip();