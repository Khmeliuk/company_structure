import {
  Briefcase,
  Car,
  FileText,
  Phone,
  Plus,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";

const EmployeeForm = ({ onSave, initialData, onCancel }) => {
  const [employee, setEmployee] = useState({
    id: initialData?.id || `emp-${Date.now()}`,
    firstName: initialData?.name?.split(" ")[0] || "",
    lastName: initialData?.name?.split(" ")[1] || "",
    position: initialData?.position || "",
    phone: initialData?.phone || "",
    hasCompanyCar: initialData?.hasCar || false,
    carModel: initialData?.carInfo?.split(" (")[0] || "",
    carNumber: initialData?.carInfo?.split("(")[1]?.replace(")", "") || "",
    notes: initialData?.notes || [],
  });

  const [currentNote, setCurrentNote] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addNote = () => {
    if (currentNote.trim()) {
      setEmployee((prev) => ({
        ...prev,
        notes: [...prev.notes, currentNote.trim()],
      }));
      setCurrentNote("");
    }
  };

  const removeNote = (index) => {
    setEmployee((prev) => ({
      ...prev,
      notes: prev.notes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...employee,
      name: `${employee.firstName} ${employee.lastName}`,
      hasCar: employee.hasCompanyCar,
      carInfo: employee.hasCompanyCar
        ? `${employee.carModel} (${employee.carNumber})`
        : null,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.firstName)}+${encodeURIComponent(employee.lastName)}&background=${initialData ? "0054a6" : "64748b"}&color=fff`,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden text-left border-t-4 border-[#0054a6]">
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#0054a6] p-2 rounded-xl text-white shadow-md">
            <UserPlus size={20} />
          </div>
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight italic">
            Картка працівника
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="bg-slate-100 p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6 max-h-[75vh] overflow-y-auto"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-[0.2em] ml-1">
              Ім'я
            </label>
            <input
              name="firstName"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-[0.2em] ml-1">
              Прізвище
            </label>
            <input
              name="lastName"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
              <Briefcase size={12} /> Посада
            </label>
            <input
              name="position"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.position}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
              <Phone size={12} /> Телефон
            </label>
            <input
              name="phone"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
            <FileText size={12} /> Примітки
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#0054a6]"
              placeholder="Додати..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addNote())
              }
            />
            <button
              type="button"
              onClick={addNote}
              className="bg-[#ffed00] p-3 rounded-xl text-slate-800 shadow-sm"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {employee.notes.map((note, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-700 text-[9px] font-black uppercase px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-200"
              >
                {note}{" "}
                <X
                  size={10}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => removeNote(idx)}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="hasCompanyCar"
              className="w-5 h-5 rounded border-slate-300 text-[#0054a6] focus:ring-0"
              checked={employee.hasCompanyCar}
              onChange={handleChange}
            />
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <Car size={16} className="text-[#0054a6]" /> Службове авто
            </span>
          </label>
          {employee.hasCompanyCar && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
              <input
                name="carModel"
                placeholder="Марка авто"
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-1 focus:ring-[#0054a6]"
                value={employee.carModel}
                onChange={handleChange}
              />
              <input
                name="carNumber"
                placeholder="Номер (напр. BX 1234 AA)"
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-1 focus:ring-[#0054a6]"
                value={employee.carNumber}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-[#0054a6] text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-xs shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            Зберегти дані
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 border-2 border-slate-100 text-slate-400 font-black rounded-xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
