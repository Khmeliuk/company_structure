
import { 
  createDepartmentHandler, 
  updateDepartmentHandler, 
  getDepartmentsHandler, 
  getDepartmentByIdHandler, 
  deleteDepartmentHandler 
} from "../controllers/department.handler.js";
import { createDepartmentInputSchema, updateDepartmentInputSchema } from "../schema/department.schema.js";

export default async function departments(fastify, opt) {
  fastify.route({
    method: "POST",
    url: "/",
    attachValidation: true,
    preHandler: validateBody(createDepartmentInputSchema),
    handler: createDepartmentHandler,
  });

  fastify.route({
    method: "PATCH",
    url: "/:id",
    attachValidation: true,
    preHandler: validateBody(updateDepartmentInputSchema),
    handler: updateDepartmentHandler,
  });

  fastify.route({
    method: "GET",
    url: "/",
    attachValidation: true,
    handler: getDepartmentsHandler,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    attachValidation: true,
    handler: getDepartmentByIdHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    attachValidation: true,
    handler: deleteDepartmentHandler,
  });
}