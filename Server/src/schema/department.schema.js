import { z } from "zod";

// 1. Універсальна схема для співробітника / керівника
// Оскільки поля manager та staff однакові, перевикористовуємо одну схему
export const personSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    position: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    hasCar: z.boolean().default(false),
    carInfo: z.string().optional().nullable(),
    photo: z.string().optional().nullable(),
    notes: z.array(z.string()).default([]),
  })
  .strip();

// 2. Головна рекурсивна схема відділу
export const departmentSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(1, "Department name is required"),
    manager: personSchema.optional().nullable(), // дозволяє undefined або null
    staff: z.array(personSchema).default([]),
    subDepartments: z.array(z.lazy(() => departmentSchema)).default([]),
  })
  .strip();

export const saveStructureInputSchema = z.object({
  data: departmentSchema, // змінено з 'structure' на 'data'
  updatedBy: z
    .object({
      userId: z.string().optional(),
      name: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  changeReason: z.string().optional(),
});

// 3. Експорти для Fastify
export const createDepartmentInputSchema = departmentSchema;
export const updateDepartmentInputSchema = departmentSchema; // Повний PUT замість PATCH
