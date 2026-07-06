import { useMemo, useState } from "react";
import getAllEmployees from "../features/employees/getAllEmployees";
import { Award, Car, Phone, Search, Shield } from "lucide-react";

const EmployerStructure = ({ data }) => {
  const [search, setSearch] = useState("");
  const allEmployees = useMemo(() => getAllEmployees(data), [data]);

  const filtered = allEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase()) ||
      e.deptName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-black text-slate-800 uppercase italic">
            Реєстр персоналу
          </h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
            Загальна кількість: {allEmployees.length}
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Пошук за іменем, посадою або відділом..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-[#ffed00]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex items-start gap-4 text-left"
          >
            <img
              src={emp.photo}
              className="w-16 h-16 rounded-2xl border-2 border-slate-50 group-hover:border-[#ffed00] transition-colors"
              alt={emp.name}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-black text-slate-800 text-sm truncate uppercase tracking-tighter">
                  {emp.name}
                </p>
                {emp.isManager && (
                  <Award size={14} className="text-[#0054a6] shrink-0" />
                )}
              </div>
              <p className="text-[10px] font-bold text-[#0054a6] uppercase mb-2 truncate">
                {emp.position}
              </p>
              <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                <span className="flex items-center gap-1.5">
                  <Shield size={10} className="text-slate-300" /> {emp.deptName}
                </span>
                {emp.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={10} className="text-slate-300" /> {emp.phone}
                  </span>
                )}
                {emp.hasCar && (
                  <span className="flex items-center gap-1.5 text-green-600">
                    <Car size={10} /> Службове авто
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerStructure;
