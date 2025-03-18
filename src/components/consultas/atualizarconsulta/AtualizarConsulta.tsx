import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import Consulta from "../../../models/Consulta";
import Medico from "../../../models/Medico";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { atualizar, buscar } from "../../../service/Service"; // Supondo que 'buscar' seja o método GET da sua API.

interface AtualizarConsultaModalProps {
  consulta: Consulta;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (consultaAtualizada: Consulta) => void;
}

export function AtualizarConsultaModal({
  consulta,
  isOpen,
  onClose,
  onUpdate,
}: AtualizarConsultaModalProps) {
  const [formData, setFormData] = useState<Consulta>({
    id: 0,
    paciente: null,
    especialidade: "",
    queixa: "",
    dataHora: "",
    medico: null,
    statusPagamento: "",
    status: "",
  });

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (isOpen) {
      buscar("/medicos", setMedicos, {
        headers: { Authorization: token },
      }).catch((error) => {
        console.error("Erro ao buscar médicos:", error);
        if (error.toString().includes("403")) handleLogout();
      });
    }
  }, [isOpen, token, handleLogout]);

  useEffect(() => {
    if (isOpen && consulta) {
      setFormData({ ...consulta });
    }
  }, [isOpen, consulta]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await atualizarConsulta();
    onUpdate(formData);
    onClose();
  };

  async function atualizarConsulta() {
    try {
      await atualizar(`/consultas`, formData, setFormData, {
        headers: { Authorization: token },
      });

      toast.success("Consulta atualizada com sucesso!");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  const especialidades = [
    "Cardiologia",
    "Dermatologia",
    "Endocrinologia",
    "Ginecologia",
    "Neurologia",
    "Oftalmologia",
    "Ortopedia",
    "Pediatria",
    "Psiquiatria",
    "Urologia",
  ];

  const [especialidade, setEspecialidade] = useState("");
  const [medicosEspecialistas, setMedicosEspecialistas] = useState<Medico[]>(
    []
  );

  useEffect(() => {
    if (especialidade) {
      buscar(
        `/medicos/especialidade/${especialidade}`,
        setMedicosEspecialistas,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    }
  }, [especialidade]);

  if (!isOpen) return null;

  function setValue(arg0: string, medicoSelecionado: Medico) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Atualizar Consulta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Paciente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paciente
            </label>
            <input
              type="text"
              value={consulta.paciente?.nome || "Paciente não informado"}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          {/* Especialidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade
            </label>
            <select
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
            >
              <option value="">Selecione uma especialidade</option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

          {/* Queixa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Queixa
            </label>
            <input
              type="text"
              value={formData.queixa}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, queixa: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              value={formData.dataHora.split("T")[0]} // Caso venha no formato ISO
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dataHora: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          {/* Médico */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Médico Responsável
            </label>
            <select
              onChange={(e) => {
                const medicoSelecionado = medicosEspecialistas.find(
                  (m) => m.id === Number(e.target.value)
                );
                setValue("medico", medicoSelecionado);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
            >
              <option value="">Selecione o médico</option>
              {medicosEspecialistas.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  Dr(a). {medico.nome} - CRM: {medico.crm}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              required
            >
              <option value="">Selecione o status</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
