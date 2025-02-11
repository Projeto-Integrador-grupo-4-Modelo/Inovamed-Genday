import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import Cliente from "../../../models/Cliente";
import { atualizar } from "../../../service/Service";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

interface AtualizarPacienteModalProps {
  paciente: Cliente;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (AtualizarPaciente: Cliente) => void;
}

export function AtualizarPacienteModal({
  paciente,
  isOpen,
  onClose,
  onUpdate,
}: AtualizarPacienteModalProps) {
  const [formData, setFormData] = useState<Omit<Cliente, "consulta">>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: "",
    convenio: false,
  });

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (isOpen) {
      setFormData({
        id: paciente.id,
        nome: paciente.nome,
        email: paciente.email,
        telefone: paciente.telefone,
        cpf: paciente.cpf,
        endereco: paciente.endereco,
        convenio: paciente.convenio,
      });
    }
  }, [isOpen, paciente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await atualizarPaciente();
      onUpdate({ ...paciente, ...formData });
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
    }
  };

  if (!isOpen) return null;

  async function atualizarPaciente() {
    try {
      await atualizar(`/clientes`, formData, setFormData, {
        headers: { Authorization: token },
      });

      toast.success("Paciente atualizado com sucesso!");
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
          Atualizar Paciente
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nome: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, telefone: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF
            </label>
            <input
              type="text"
              value={formData.cpf}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cpf: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              value={formData.endereco}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endereco: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="convenio"
              checked={formData.convenio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, convenio: e.target.checked }))
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-teal-600 rounded"
            />
            <label
              htmlFor="convenio"
              className="ml-2 block text-sm text-gray-700"
            >
              Convênio
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-600 rounded-md"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
