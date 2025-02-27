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
import Paciente from "../../../models/Paciente";
import { AtualizarPacienteModal } from "../atualizarpaciente/AtualizarPaciente";
import { ConfirmarDeleteModal } from "../deletarpaciente/DeletarPaciente";

interface CardPacienteProps {
  paciente: Paciente;
  onDelete: (id: number) => void;
  onUpdate: (patient: Paciente) => void;
}

export function CardPaciente({
  paciente,
  onUpdate,
  onDelete,
}: CardPacienteProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div
          className="bg-gradient-to-r from-teal-700 to-teal-800 px-6 py-4 cursor-pointer"
          onClick={() => setIsDetailsVisible(!isDetailsVisible)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <User className="w-6 h-6 text-teal-800" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {paciente.nome}
                </h3>
                <p className="text-teal-200">CPF: {paciente.cpf}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="p-2 text-white bg-teal-700 hover:bg-teal-600 rounded-full transition-colors duration-200"
                title="Editar paciente"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
                className="p-2 text-white bg-teal-700 hover:bg-teal-600 rounded-full transition-colors duration-200"
                title="Excluir paciente"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{paciente.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{paciente.telefone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">
                  {paciente.convenio ? "Convênio" : "Particular"}
                </span>
              </div>
            </div>

            {isDetailsVisible && (
              <div className="p-4 bg-gray-50 rounded-lg ">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Endereço
                </h4>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      {paciente.endereco} - {paciente.complemento}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">CEP: {paciente.cep}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      {paciente.bairro} - {paciente.cidade}
                    </span>
                  </div>
                </div>
              </div>
            )}
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
      </div>
    </>
  );
}
export default CardPaciente;
