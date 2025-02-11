import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CreditCard,
  User,
  Trash2,
  Edit,
} from "lucide-react";
import Cliente from "../../../models/Cliente";
import { AtualizarPacienteModal } from "../atualizarpaciente/AtualizarPaciente";
import { ConfirmarDeleteModal } from "../deletarpaciente/DeletarPaciente";

interface CardPacienteProps {
  paciente: Cliente;
  onDelete: (id: number) => void;
  onUpdate: (patient: Cliente) => void;
}

export function CardPaciente({
  paciente,
  onUpdate,
  onDelete,
}: CardPacienteProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="bg-teal-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <User className="w-6 h-6 text-teal-800" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {paciente.nome}
                </h3>
                <p className="text-blue-100">CPF: {paciente.cpf}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 text-white hover:bg-teal-600 rounded-full transition-colors duration-200"
                title="Editar paciente"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-2 text-white hover:bg-teal-600 rounded-full transition-colors duration-200"
                title="Excluir paciente"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{paciente.telefone}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{paciente.email}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{paciente.endereco}</span>
              </div>

              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">
                  {paciente.convenio ? "Convênio" : "Particular"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AtualizarPacienteModal
        paciente={paciente}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={onUpdate}
      />
      <ConfirmarDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => onDelete(paciente.id)}
        paciente={paciente}
      />
    </>
  );
}
