import React, { useContext, useEffect, useState } from "react";
import {
  Stethoscope,
  MessageCircle,
  Calendar,
  User,
  Activity,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Consulta from "../../../models/Consulta";
import { buscar, cadastrar } from "../../../service/Service";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import Paciente from "../../../models/Paciente";

function FormConsultas() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [consulta, setConsulta] = useState<Consulta>({
    id: 0,
    especialidade: "",
    data: "",
    queixa: "",
    medicoResponsavel: "",
    status: "Pendente",
    paciente: null,
  });
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [cpf, setCpf] = useState<string>("");
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPacientePorCpf(cpf: string) {
    setIsLoading(true);
    setBuscaRealizada(false);

    try {
      let pacienteEncontrado: Paciente | null = null;

      await buscar(
        `pacientes/cpf/${cpf}`,
        (data: Paciente) => {
          pacienteEncontrado = data;
          setPaciente(data);
        },
        {
          headers: { Authorization: token },
        }
      );

      if (pacienteEncontrado) {
        setConsulta((prev) => ({ ...prev, paciente: pacienteEncontrado }));
      }
    } catch (error) {
      setPaciente(null);
      setConsulta((prev) => ({ ...prev, paciente: null }));
    } finally {
      setIsLoading(false);
      setBuscaRealizada(true);
    }
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const handleCpfKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (cpf) {
        buscarPacientePorCpf(cpf);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setConsulta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consulta.paciente) {
      toast.error("Selecione um paciente antes de cadastrar a consulta.");
      return;
    }

    setIsLoading(true);
    try {
      await cadastrar("consultas", consulta, setConsulta, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      toast.success("Consulta cadastrada com sucesso!");

      abrirWhatsAppConsulta();

      navigate("/dashboard/Consulta");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar consulta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (buscaRealizada) {
      if (paciente) {
        toast.success(`Paciente encontrado: ${paciente.nome}`);
      } else {
        toast.error("Nenhum Paciente encontrado!");
      }
    }
  }, [buscaRealizada, paciente]);

  useEffect(() => {
    if (!token) {
      toast.error("Você precisa estar logado");
      navigate("/home");
    }
  }, [token, navigate]);

  function abrirWhatsAppConsulta() {
    if (!paciente || !paciente.telefone) {
      toast.error("Paciente ou telefone inválido!");
      return;
    }

    const telefoneFormatado = paciente.telefone.replace(/\D/g, "");

    const formatarData = (data: string) => {
      const partesData = data.split("-");
      const dia = partesData[2];
      const mes = partesData[1];
      const ano = partesData[0];
      return `${dia}/${mes}/${ano}`;
    };

    const mensagem = `
    Olá ${decodeURIComponent(paciente.nome)}, sua consulta foi agendada com sucesso! 

    Aqui estão os detalhes:

    Especialidade: ${decodeURIComponent(consulta.especialidade)}
    Data: ${formatarData(decodeURIComponent(consulta.data))}
    Médico Responsável: ${decodeURIComponent(consulta.medicoResponsavel)}
    Queixa: ${decodeURIComponent(consulta.queixa)}
    Status: ${decodeURIComponent(consulta.status)}

    Aguardamos você na data e horário agendado. Qualquer dúvida, estamos à disposição.
  `;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${telefoneFormatado}&text=${encodeURIComponent(mensagem)}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <h2 className="text-3xl font-bold text-center text-[#29bda6] mb-8">
            Cadastrar Consulta
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-[#] mb-1">
                <Users className="w-4 h-4 mr-2 text-[#29bda6]" />
                Paciente
              </label>
              <input
                type="text"
                placeholder="Digite o CPF do paciente"
                className="w-full px-4 py-2 border border-[#] rounded-md focus:ring-2 focus:ring-[#] focus:border-[#] transition-colors"
                value={cpf}
                onChange={handleCpfChange}
                onKeyDown={handleCpfKeyDown}
                required
              />
              {buscaRealizada && (
                <p
                  className={`mt-2 text-sm ${paciente ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {paciente
                    ? `Paciente encontrado: ${paciente.nome}${paciente.convenio
                      ? " - Este paciente possui convênio ✅"
                      : ""
                    }`
                    : "Nenhum Paciente encontrado!"}
                </p>
              )}
            </div>
            {paciente && !paciente.convenio && (
              <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p>Este paciente não possui convênio. Ofertas disponíveis:</p>
                <ul className="list-disc ml-5">
                  <li>Consulta particular: R$ 120,00</li>
                  <li>Pacote familiar: R$ 450,00</li>
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-[#] mb-1">
                  <Stethoscope className="w-4 h-4 mr-2 text-[#29bda6]" />
                  Especialidade
                </label>
                <input
                  type="text"
                  name="especialidade"
                  placeholder="Digite a especialidade"
                  className="w-full px-4 py-2 border border-[#] rounded-md focus:ring-2 focus:ring-[#] focus:border-[#] transition-colors"
                  value={consulta.especialidade}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-[#] mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-[#29bda6]" />
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  className="w-full px-4 py-2 border border-[#] rounded-md focus:ring-2 focus:ring-[#] focus:border-[#] transition-colors"
                  value={consulta.data}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#] mb-1">
                <MessageCircle className="w-4 h-4 mr-2 text-[#29bda6]" />
                Queixa
              </label>
              <textarea
                name="queixa"
                placeholder="Digite a queixa do paciente"
                className="w-full px-4 py-2 border border-[#] rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors h-32 resize-none"
                value={consulta.queixa}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#] mb-1">
                <User className="w-4 h-4 mr-2 text-[#29bda6]" />
                Médico Responsável
              </label>
              <input
                type="text"
                name="medicoResponsavel"
                placeholder="Digite o nome do médico responsável"
                className="w-full px-4 py-2 border border-[#] rounded-md focus:ring-2 focus:ring-[#] focus:border-[#] transition-colors"
                value={consulta.medicoResponsavel}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-[#] mb-1">
                  <Activity className="w-4 h-4 mr-2 text-[#29bda6]" />
                  Status
                </label>
                <select
                  name="status"
                  className="w-full px-4 py-2 border border-[#] rounded-md focus:ring-2 focus:ring-[#] focus:border-[#] transition-colors bg-[#]"
                  value={consulta.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Em andamento">Em andamento</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Confirmada">Confirmada</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading || !paciente}
                className={`w-full py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 text-lg font-medium ${isLoading || !paciente
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#29bda6] hover:bg-[#278b7c] text-white"
                  }`}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar Consulta"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormConsultas;