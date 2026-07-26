import {
  getStructureHandler,
  saveStructureHandler,
} from "../controllers/department.handler.js";
import { departmentSchema } from "../schema/department.schema.js";
import { validateBody } from "../utils/validation.js";

export default async function companyRoutes(fastify, opt) {
  // Отримати структуру компанії
  fastify.route({
    method: "GET",
    url: "/structure",
    handler: getStructureHandler,
  });

  // Перезаписати / оновити структуру компанії
  fastify.route({
    method: "PUT",
    url: "/structure",
    attachValidation: true,
    preHandler: validateBody(departmentSchema),
    handler: saveStructureHandler,
  });
}
