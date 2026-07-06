import { Phone, Globe, Mail, MapPin, Facebook, Zap } from "lucide-react";

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#0054a6] p-2 rounded-lg text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-white font-black uppercase tracking-tighter">
            АТ "ХОЕ"
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-6">
          Автоматизована система управління організаційною структурою та
          кадровим потенціалом товариства.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#ffed00] transition-colors">
            <Facebook size={18} />
          </a>
          <a href="#" className="hover:text-[#ffed00] transition-colors">
            <Globe size={18} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 border-l-2 border-[#ffed00] pl-3">
          Контакти
        </h4>
        <ul className="space-y-4 text-xs">
          <li className="flex items-center gap-3">
            <MapPin size={14} className="text-[#0054a6]" /> вул. Храновського,
            11А
          </li>
          <li className="flex items-center gap-3">
            <Phone size={14} className="text-[#0054a6]" /> +38 (0382) 67-12-34
          </li>
          <li className="flex items-center gap-3">
            <Mail size={14} className="text-[#0054a6]" /> office@hoe.com.ua
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 border-l-2 border-[#ffed00] pl-3">
          Навігація
        </h4>
        <ul className="space-y-3 text-xs font-bold uppercase tracking-tight">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Головна сторінка
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Статут компанії
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Вакансії
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Звітність
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 border-l-2 border-[#ffed00] pl-3">
          Підтримка
        </h4>
        <p className="text-[10px] mb-4">
          Виникли технічні питання щодо роботи порталу?
        </p>
        <button className="w-full bg-[#0054a6] hover:bg-blue-700 text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
          IT-підтримка
        </button>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] uppercase tracking-widest font-bold">
        © {new Date().getFullYear()} АТ "Хмельницькобленерго". Всі права
        захищені.
      </p>
      <div className="flex gap-6 text-[9px] uppercase font-black tracking-tighter">
        <a href="#" className="hover:text-white">
          Політика конфіденційності
        </a>
        <a href="#" className="hover:text-white">
          Умови використання
        </a>
      </div>
    </div>
  </footer>
);
export default Footer;
