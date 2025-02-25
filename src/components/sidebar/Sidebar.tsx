import {
  Calendar,
  UserPlus,
  CalendarPlus,
  LayoutDashboard,
  User,
  ChevronDown,
  Contact,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Sidebar() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

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
      icon: UserPlus,
      label: "Cadastrar",
      submenu: [
        {
          icon: Calendar,
          label: "Consulta",
          path: "/dashboard/cadastro-consulta",
        },
        {
          icon: UserPlus,
          label: "Paciente",
          path: "/dashboard/cadastro-paciente",
        },
        {
          icon: Contact,
          label: "Medico",
          path: "/dashboard/cadastro-medico",
        },
      ],
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
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0    ${
                        isSubmenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isSubmenuOpen && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={`${index}-${subIndex}`}>
                          <Link
                            to={subItem.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                          >
                            <subItem.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="font-medium">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}