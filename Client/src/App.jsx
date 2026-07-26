// Використовуємо BrowserRouter для локальної розробки (VS Code)
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StructurePage from "./pages/StructurePage";
import EmployeesPage from "./pages/EmployeesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ProtectedLayout from "./layout/ProtectionLayout";
import { useGetCurrentUser } from "./hooks/reactQuery";
import { useEffect } from "react";

export default function App() {
  const { data: user } = useGetCurrentUser();
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [data, setData] = useState(user);

  return (
    <Router>
      {/* <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-[#0054a6]"> */}

      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/Auth" element={<AuthPage />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="/structure" element={<StructurePage data={data} />} />
            <Route path="/employees" element={<EmployeesPage data={data} />} />
            <Route path="/analytics" element={<AnalyticsPage data={data} />} />
            <Route path="*" element={<StructurePage data={data} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="py-12 border-t border-slate-100 mt-20">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">
          Operations Dashboard
        </p>
      </footer>
      {/* </div> */}
    </Router>
  );
}
