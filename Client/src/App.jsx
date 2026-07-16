// Використовуємо BrowserRouter для локальної розробки (VS Code)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StructurePage from "./pages/StructurePage";
import EmployeesPage from "./pages/EmployeesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Navigation from "./pages/Navigation";
import { useState } from "react";
import initialDepartments from "./data/initialDepartments";
import AuthPage from "./pages/AuthPage";
import ProtectedLayout from "./components/ProtectedRoute"

export default function App() {
  const [data, setData] = useState(initialDepartments);
  useState(() => {
    const savedData = localStorage.getItem("companyData");
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-[#0054a6]">
        <Navigation />

        <main className="max-w-7xl mx-auto">
          <Routes>
               <Route path="/Auth" element={<AuthPage />} />
             <Route path="/" element={<ProtectedLayout />}>
         
            <Route path="/structure" element={<StructurePage data={data} />} />
            <Route path="/employees" element={<EmployeesPage data={data} />} />
            <Route path="/analytics" element={<AnalyticsPage data={data} />} />
            <Route path="*" element={<StructurePage data={data} />} />
            </Route>
          </Routes>
        </main>

        <footer className="py-12 border-t border-slate-100 mt-20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">
            Operations Dashboard
          </p>
        </footer>
      </div>
    </Router>
  );
}
