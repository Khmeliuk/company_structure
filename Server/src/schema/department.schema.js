import { z } from "zod";

// 1. Універсальна схема для співробітника / керівника
// Оскільки поля manager та staff однакові, перевикористовуємо одну схему
export const personSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    position: z.string().trim().min(1, "Position is required"),
    phone: z.string().trim().min(1, "Phone is required"),
    hasCar: z.boolean().default(false),
    carInfo: z.string().trim().optional(),
    photo: z.string().url("Invalid photo URL").or(z.literal("")).optional(),
    notes: z.array(z.string()).default([]),
  })
  .strip();

// 2. Головна рекурсивна схема відділу
export const departmentSchema = z
  .object({
    name: z.string().trim().min(1, "Department name is required"),
    manager: personSchema,
    staff: z.array(personSchema).default([]),
    subDepartments: z.array(z.lazy(() => departmentSchema)).default([]),
  })
  .strip();

export const saveStructureInputSchema = z.object({
  // Самі дані структури
  structure: departmentSchema,
  // Метадані про автора змін
  updatedBy: z.object({
    userId: z.string().min(1),
    userName: z.string().min(1),
    userEmail: z.string().email().optional(),
  }),
  changeReason: z.string().optional(),
});

// 3. Експорти для Fastify
export const createDepartmentInputSchema = departmentSchema;
export const updateDepartmentInputSchema = departmentSchema; // Повний PUT замість PATCH
