import React, { useEffect, useState, useContext } from "react";
import { Users, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { buscar } from "../../service/Service";
import { AuthContext } from "../../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    async function buscarPacientes() {
      try {
        await buscar("/clientes", setPacientes, {
          headers: { Authorization: token },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        }
      }
    }

    buscarPacientes();
  }, [token]);

  const stats = [
    {
      icon: Users,
      label: "Pacientes Ativos",
      value: pacientes.length,
      trend: "up",
      change: "+4%",
    },
    {
      icon: Calendar,
      label: "Consultas Hoje",
      value: "42",
      trend: "down",
      change: "-2%",
    },
  ];

  const lineData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Consultas na Semana",
        data: [35, 42, 28, 50, 60, 45, 38],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Consultas Realizadas ao Longo da Semana",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">
          Bem-vindo ao InovaMed
        </h2>
        <p className="mt-2 text-gray-600">Painel de controle e estatísticas</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Pacientes Ativos e Consultas Hoje lado a lado */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pacientes Ativos
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pacientes.length.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <ArrowUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">+4%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-emerald-500" />
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Consultas Hoje
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">42</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">-2%</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500" />
            </div>
          </div>

          {/* Outros Cards */}
          {stats.slice(2).map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {typeof stat.value === "number"
                      ? stat.value.toLocaleString()
                      : stat.value}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        stat.trend === "up"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Consultas da Semana
          </h3>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </main>
  );
}
