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
  ChartOptions,
} from "chart.js";
import { buscar } from "../../service/Service";
import { AuthContext } from "../../context/AuthContext";
import Consulta from "../../models/Consulta";
import toast from "react-hot-toast";

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
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    async function buscarDados() {
      try {
        await buscar("/pacientes", setPacientes, {
          headers: { Authorization: token },
        });

        await buscar("/consultas", setConsultas, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toast.error("Sessão expirada, faça login novamente.");
          handleLogout();
        } else {
          toast.error("Erro ao carregar dados. Tente novamente.");
        }
      }
    }

    if (token) {
      buscarDados();
    }
  }, [token]);

  function contarConsultasPorDia() {
    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const contagem = [0, 0, 0, 0, 0, 0, 0];

    consultas.forEach((consulta) => {
      const data = new Date(consulta.dataHora);
      const diaSemana = data.getDay();
      const indice = diaSemana === 0 ? 6 : diaSemana - 1;
      contagem[indice]++;
    });

    return contagem;
  }

  const consultasPorDia = contarConsultasPorDia();

  const lineData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Consultas na Semana",
        data: consultasPorDia,
        borderColor: "#10B981", // verde suave
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6, // Deixa os pontos maiores e mais fáceis de visualizar
        tension: 0.3, // Suave curvatura na linha
        fill: true,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // Faz ele se ajustar melhor ao container
    plugins: {
      legend: {
        display: false, // Oculta a legenda porque você não precisa dela aqui
      },
      title: {
        display: true,
        text: "Consultas Realizadas por Dia da Semana",
        font: {
          size: 16,
          weight: "bold",
          family: "Arial, sans-serif",
        },
        color: "#374151", // Cinza escuro
        padding: {
          bottom: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 6,
        caretSize: 6,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false, // Mantém o visual limpo
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const consultasHoje = consultas.filter((consulta) => {
    const hoje = new Date();
    const dataConsulta = new Date(consulta.dataHora);
    return (
      dataConsulta.toISOString().slice(0, 10) ===
      hoje.toISOString().slice(0, 10)
    );
  }).length;

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">
          Bem-vindo ao InovaMed
        </h2>
        <p className="mt-2 text-gray-600">Painel de controle e estatísticas</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  {/* <ArrowUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">+4%</span> */}
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
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {consultasHoje}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  {/* <ArrowDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">-2%</span> */}
                </div>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
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
