import { Zap } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-[110] bg-white border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-[#0054a6] p-2.5 rounded-xl text-white shadow-lg shadow-blue-100">
          <Zap size={24} fill="currentColor" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">
            Хмельницькобленерго
          </h1>
          <p className="text-[10px] text-[#0054a6] font-black uppercase tracking-[0.2em] mt-1">
            Personnel Hierarchy System
          </p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        <a href="#" className="text-[#0054a6] border-b-2 border-[#ffed00] pb-1">
          Структура
        </a>
        <a href="#" className="hover:text-[#0054a6] transition-colors">
          Працівники
        </a>
        <a href="#" className="hover:text-[#0054a6] transition-colors">
          Аналітика
        </a>
      </nav>

      <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black text-slate-600 uppercase">
          Система онлайн
        </span>
      </div>
    </div>
  </header>
);
export default Header;
