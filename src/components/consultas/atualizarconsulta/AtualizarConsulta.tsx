import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import Consulta from "../../../models/Consulta";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { atualizar } from "../../../service/Service";

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
    cliente: null,
    especialidade: "",
    queixa: "",
    data: "",
    medicoResponsavel: "",
    status: "",
  });

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (isOpen && consulta) {
      setFormData({
        id: consulta.id,
        cliente: consulta.cliente,
        especialidade: consulta.especialidade,
        queixa: consulta.queixa,
        data: consulta.data,
        medicoResponsavel: consulta.medicoResponsavel,
        status: consulta.status,
      });
    }
  }, [isOpen, consulta]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await atualizarConsulta();
    onUpdate({ ...consulta, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  async function atualizarConsulta() {
    try {
      await atualizar(`/consultas`, formData, setFormData, {
        headers: { Authorization: token },
      });

      toast.success("Consulta atualizado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paciente
            </label>
            <input
              type="text"
              value={consulta.cliente?.nome || "Paciente não informado"}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade
            </label>
            <input
              type="text"
              value={formData.especialidade}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  especialidade: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              value={formData.data}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, data: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Médico Responsável
            </label>
            <select
              value={formData.medicoResponsavel}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  medicoResponsavel: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              required
            >
              <option value="">Selecione o médico</option>
              <option value="Dr. Silva">Dr. Silva</option>
              <option value="Dr. Costa">Dr. Costa</option>
              <option value="Dr. Almeida">Dr. Almeida</option>
            </select>
          </div>

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
              onClick={(e) => {
                e.preventDefault();
                onUpdate({ ...consulta, ...formData });
                onClose();
              }}
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
