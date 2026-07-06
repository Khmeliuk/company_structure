import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-40 text-slate-400">
    <Loader2 size={40} className="animate-spin mb-4 text-[#0054a6]" />
    <p className="text-[10px] font-black uppercase tracking-widest">
      Завантаження системи...
    </p>
  </div>
);
export default LoadingSpinner;
