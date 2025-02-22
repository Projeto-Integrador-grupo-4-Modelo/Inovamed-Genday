import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { atualizar } from "../../../service/Service";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import Paciente from "../../../models/Paciente";

interface AtualizarPacienteModalProps {
  paciente: Paciente;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (AtualizarPaciente: Paciente) => void;
}

export function AtualizarPacienteModal({
  paciente,
  isOpen,
  onClose,
  onUpdate,
}: AtualizarPacienteModalProps) {
  const [formData, setFormData] = useState<Omit<Paciente, "consulta">>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: "",
    complemento: "",
    cep: "",
    cidade: "",
    bairro: "",
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
        complemento: paciente.complemento,
        cep: paciente.cep,
        bairro: paciente.bairro,
        cidade: paciente.cidade,
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
      await atualizar(`/pacientes`, formData, setFormData, {
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
      <div className="bg-white rounded-lg w-full max-w-lg h-auto p-6 relative mx-4">
        {" "}
        {/* Ajustando o max-w para um tamanho maior e ajustando a altura */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-teal-800 mb-6">
          Atualizar Paciente
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {" "}
          {/* Alterando para grid layout */}
          <div className="col-span-2">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <input
              type="text"
              value={formData.complemento}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  complemento: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CEP
            </label>
            <input
              type="text"
              value={formData.cep}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cep: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bairro
            </label>
            <input
              type="text"
              value={formData.bairro}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bairro: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              value={formData.cidade}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cidade: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div className="col-span-2 flex items-center">
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
          <div className="col-span-2 flex justify-end space-x-3 mt-6">
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
