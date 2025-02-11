import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  LogOut,
  UserPlus,
  CalendarPlus,
  LayoutDashboard,
  User,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function Sidebar() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  function Logout() {
    handleLogout();

    toast.success("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: CalendarPlus,
      label: "Agenda",
      path: "/dashboard/Consulta",
    },

    {
      icon: Calendar,
      label: "Cadastro de Consulta",
      path: "/dashboard/cadastro-consulta",
    },
    {
      icon: UserPlus,
      label: "Cadastro de Paciente",
      path: "/dashboard/cadastro-paciente",
    },
    {
      icon: User,
      label: "Pacientes",
      path: "/dashboard/pacientes",
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-[#0D9488] via-[#0d9389] to-[#1C74c8] text-white flex flex-col shadow-xl p-6">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="https://i.imgur.com/Xza8h0B.png" alt="" className="h-20" />
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group "
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10 rounded-lg">
        <button
          onClick={Logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-white/10 transition-colors duration-200 group"
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
}
