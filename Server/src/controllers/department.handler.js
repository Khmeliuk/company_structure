import { DepartmentHistory } from "../models/departmentHistory.model.js";
import { Department } from "../models/structureCompany.js";

export async function saveStructureHandler(request, reply) {
  const { structure, updatedBy, changeReason } = request.body;
  console.log("saveStructure");

  // 1. Отримуємо поточний стан до оновлення
  const currentStructure = await Department.findOne();

  if (currentStructure) {
    // 2. Зберігаємо знімок поточного стану в історію
    await DepartmentHistory.create({
      updatedBy,
      changeReason,
      snapshot: currentStructure.toObject(),
    });

    // 3. Обмежуємо історію до 5 останніх записів
    const historyCount = await DepartmentHistory.countDocuments();
    if (historyCount > 5) {
      // Знаходимо найстаріші записи, які виходять за ліміт 5, і видаляємо їх
      const oldestRecords = await DepartmentHistory.find()
        .sort({ createdAt: 1 }) // від найстаріших до новіших
        .limit(historyCount - 5);

      const idsToDelete = oldestRecords.map((doc) => doc._id);
      await DepartmentHistory.deleteMany({ _id: { $in: idsToDelete } });
    }
  }

  // 4. Оновлюємо основну структуру
  const updated = await Department.findOneAndUpdate({}, structure, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

  return reply.send({
    success: true,
    data: updated,
  });
}

// GET /api/departments/history — отримати список 5 останніх збережених версій
export async function getHistoryHandler(request, reply) {
  const history = await DepartmentHistory.find()
    .sort({ createdAt: -1 }) // Новіші версії зверху
    .limit(5);

  return reply.send(history);
}

export async function getStructureHandler(request, reply) {
  const structure = await Department.findOne();
  if (!structure) {
    return reply.status(404).send({ error: "Structure not found" });
  }
  return reply.send(structure);
}
