import { useMemo } from "react";
import getAllEmployees from "../features/employees/getAllEmployees";
import {
  Award,
  BarChart2,
  Car,
  FileText,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const Analytics = ({ data }) => {
  const allEmployees = useMemo(() => getAllEmployees(data), [data]);
  const carCount = allEmployees.filter((e) => e.hasCar).length;
  const managerCount = allEmployees.filter((e) => e.isManager).length;

  // Проста статистика по департаментах
  const stats = useMemo(() => {
    const counts = {};
    allEmployees.forEach((e) => {
      counts[e.deptName] = (counts[e.deptName] || 0) + 1;
    });
    return Object.entries(counts);
  }, [allEmployees]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 text-left">
      <h2 className="text-3xl font-black text-slate-800 uppercase italic mb-10">
        Аналітичний дашборд
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-blue-50 p-4 rounded-full text-[#0054a6] mb-4">
            <Users size={32} />
          </div>
          <p className="text-4xl font-black text-slate-800">
            {allEmployees.length}
          </p>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
            Штат компанії
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-yellow-50 p-4 rounded-full text-yellow-600 mb-4">
            <Award size={32} />
          </div>
          <p className="text-4xl font-black text-slate-800">{managerCount}</p>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
            Керівників
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-green-50 p-4 rounded-full text-green-600 mb-4">
            <Car size={32} />
          </div>
          <p className="text-4xl font-black text-slate-800">{carCount}</p>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
            Службових авто
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-purple-50 p-4 rounded-full text-purple-600 mb-4">
            <TrendingUp size={32} />
          </div>
          <p className="text-4xl font-black text-slate-800">100%</p>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
            Ефективність
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-8 flex items-center gap-2">
            <BarChart2 size={18} className="text-[#0054a6]" /> Розподіл по
            підрозділах
          </h3>
          <div className="space-y-6">
            {stats.map(([name, count]) => (
              <div key={name}>
                <div className="flex justify-between text-[11px] font-black uppercase mb-2">
                  <span>{name}</span>
                  <span className="text-[#0054a6]">{count} чол.</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0054a6] rounded-full transition-all duration-1000"
                    style={{ width: `${(count / allEmployees.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0054a6] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <Zap className="absolute top-[-20px] right-[-20px] opacity-10 w-40 h-40" />
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
            <FileText size={18} className="text-[#ffed00]" /> Статус
            інфраструктури
          </h3>
          <div className="space-y-4">
            {[
              "Оновлення карт персоналу завершено",
              "Сервер бази даних працює стабільно",
              "Всі зміни синхронізовано з хмарою",
              "Підключено модуль аналітики v2.0",
            ].map((msg, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-[#ffed00] rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-tight">
                  {msg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
