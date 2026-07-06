import {
  ChevronDown,
  ChevronRight,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import EmployeeForm from "./EmployeeForm";

const DepartmentCard = ({ dept, onUpdateDept, onDeleteDept, onAddSubDept }) => {
  const [modalType, setModalType] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const openEdit = (emp, type) => {
    setEditingEmployee(emp);
    setModalType(type);
  };

  const handleSaveEmployee = (data) => {
    if (modalType === "manager") {
      onUpdateDept(dept.id, { manager: data });
    } else if (modalType === "staff_add") {
      onUpdateDept(dept.id, { staff: [...(dept.staff || []), data] });
    } else if (modalType === "staff_edit") {
      onUpdateDept(dept.id, {
        staff: dept.staff.map((s) => (s.id === data.id ? data : s)),
      });
    }
    setModalType(null);
    setEditingEmployee(null);
  };

  const removeStaff = (id) => {
    onUpdateDept(dept.id, { staff: dept.staff.filter((s) => s.id !== id) });
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[360px] bg-white border-t-8 border-[#0054a6] rounded-[2rem] shadow-xl hover:shadow-2xl transition-all z-10 text-left overflow-hidden">
        {/* Шапка відділу */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3 min-w-0">
            <Shield size={18} className="text-[#0054a6] shrink-0" />
            <input
              type="text"
              className="bg-transparent font-black text-slate-800 text-sm uppercase italic outline-none focus:border-b border-[#ffed00] w-full"
              value={dept.name}
              onChange={(e) => onUpdateDept(dept.id, { name: e.target.value })}
            />
          </div>
          <button
            onClick={() => onDeleteDept(dept.id)}
            className="p-2 text-slate-300 hover:text-red-500 bg-white rounded-full shadow-sm transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Секція Керівника */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Top Management
            </span>
            <button
              onClick={() => openEdit(dept.manager, "manager")}
              className="bg-blue-50 text-[#0054a6] px-3 py-1 rounded-full text-[9px] font-black uppercase hover:bg-[#ffed00] hover:text-slate-800 transition-all"
            >
              Змінити
            </button>
          </div>
          {dept.manager ? (
            <div
              onClick={() => openEdit(dept.manager, "manager")}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all group border border-transparent hover:border-slate-100"
            >
              <img
                src={dept.manager.photo}
                className="w-14 h-14 rounded-2xl border-2 border-[#ffed00] shadow-md object-cover"
                alt="Manager"
              />
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-900 text-sm truncate uppercase tracking-tighter">
                  {dept.manager.name}
                </p>
                <p className="text-[10px] text-[#0054a6] font-bold uppercase truncate mt-1">
                  {dept.manager.position}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setModalType("manager")}
              className="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-[10px] font-black uppercase hover:border-[#ffed00] hover:text-slate-800 transition-all bg-slate-50"
            >
              Призначити голову
            </button>
          )}
        </div>

        {/* Секція Працівників */}
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Users size={12} /> Команда ({dept.staff?.length || 0})
            </span>
            <button
              onClick={() => setModalType("staff_add")}
              className="bg-slate-800 p-1.5 rounded-lg text-[#ffed00] hover:scale-110 transition-transform"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
            {dept.staff && dept.staff.length > 0 ? (
              dept.staff.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#0054a6] transition-all"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    onClick={() => openEdit(emp, "staff_edit")}
                  >
                    <img
                      src={emp.photo}
                      className="w-10 h-10 rounded-xl border border-white shadow-sm object-cover"
                      alt="Staff"
                    />
                    <div className="min-w-0">
                      <p className="font-black text-slate-800 text-[11px] truncate uppercase leading-none mb-1.5">
                        {emp.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight truncate">
                        {emp.position}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeStaff(emp.id)}
                    className="p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-4 text-slate-300 opacity-50">
                <Users size={24} />
                <p className="text-[9px] font-black uppercase mt-2">
                  Персонал відсутній
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Кнопки Дій */}
        <div className="grid grid-cols-2 border-t border-slate-100">
          <button
            onClick={() => onAddSubDept(dept.id)}
            className="py-4 text-[10px] font-black uppercase text-[#0054a6] hover:bg-blue-50 border-r border-slate-100 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={14} className="text-[#ffed00] fill-current" /> Підрозділ
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="py-4 text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}{" "}
            Схема
          </button>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in">
          <div className="w-full max-w-lg scale-in">
            <EmployeeForm
              onSave={handleSaveEmployee}
              initialData={editingEmployee}
              onCancel={() => {
                setModalType(null);
                setEditingEmployee(null);
              }}
            />
          </div>
        </div>
      )}

      {isExpanded && dept.subDepartments && dept.subDepartments.length > 0 && (
        <div className="relative pt-24 flex gap-20">
          <div className="absolute top-0 left-1/2 w-1 h-12 bg-[#0054a6]/20"></div>
          {dept.subDepartments.map((subDept, index) => (
            <div key={subDept.id} className="relative">
              {dept.subDepartments.length > 1 && (
                <div
                  className={`absolute top-[-48px] h-1 bg-[#0054a6]/20 
                  ${
                    index === 0
                      ? "left-1/2 right-0"
                      : index === dept.subDepartments.length - 1
                        ? "left-0 right-1/2"
                        : "left-0 right-0"
                  }`}
                ></div>
              )}
              <div className="absolute top-[-48px] left-1/2 w-1 h-12 bg-[#0054a6]/20"></div>
              <DepartmentCard
                dept={subDept}
                onUpdateDept={onUpdateDept}
                onDeleteDept={onDeleteDept}
                onAddSubDept={onAddSubDept}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentCard;
