import { PieChart, Shield, Users, Zap } from "lucide-react";
import { Link, useLocation } from "react-router";
import myLogo from "../assets/logo.png";
import Header from "../components/Header";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/structure", label: "Структура", icon: <Shield size={18} /> },
    { path: "/employees", label: "Працівники", icon: <Users size={18} /> },
    { path: "/analytics", label: "Аналітика", icon: <PieChart size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img src={myLogo} alt="Logo" className="h-10 w-40" />
          <div className="text-left text-slate-800"></div>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 border-[#ffed00] pb-1
                ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-[#0054a6]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            API Connected
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
