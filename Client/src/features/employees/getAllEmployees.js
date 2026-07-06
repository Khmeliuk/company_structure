const getAllEmployees = (dept) => {
  let emps = [];
  if (dept.manager)
    emps.push({ ...dept.manager, deptName: dept.name, isManager: true });
  if (dept.staff)
    emps.push(
      ...dept.staff.map((s) => ({
        ...s,
        deptName: dept.name,
        isManager: false,
      })),
    );
  if (dept.subDepartments) {
    dept.subDepartments.forEach((sub) => {
      emps = [...emps, ...getAllEmployees(sub)];
    });
  }
  return emps;
};
export default getAllEmployees;
