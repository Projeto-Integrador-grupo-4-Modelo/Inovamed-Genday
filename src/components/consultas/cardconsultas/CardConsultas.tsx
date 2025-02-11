import React, { useState } from "react";
import {
  Calendar,
  User,
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Edit,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import Consulta from "../../../models/Consulta";
import { AtualizarConsultaModal } from "../atualizarconsulta/AtualizarConsulta";

interface CardConsultaProps {
  consulta: Consulta;
  onDelete: (id: number) => void;
  onUpdate: (consulta: Consulta) => void;
}

function CardConsultas({ consulta, onDelete, onUpdate }: CardConsultaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const statusIcons: Record<string, JSX.Element> = {
    Confirmada: <CheckCircle className="w-5 h-5 text-green-600 mr-2" />,
    Cancelada: <XCircle className="w-5 h-5 text-red-600 mr-2" />,
    Concluída: <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />,
    "Em andamento": <Clock className="w-5 h-5 text-yellow-600 mr-2" />,
  };

  const handleDelete = () => {
    onDelete(consulta.id);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="bg-teal-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <User className="w-6 h-6 text-teal-800" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              {consulta.cliente?.nome || "Paciente não informado"}
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 text-white hover:bg-teal-600 rounded-full transition-colors duration-300"
              title="Editar consulta"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowConfirmation(true)}
              className="p-2 text-white hover:bg-teal-600 rounded-full transition-colors duration-300"
              title="Excluir consulta"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informações 1 e 2 */}
            <div className="flex items-center space-x-3">
              <Stethoscope className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{consulta.especialidade}</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{consulta.queixa}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{consulta.data}</span>
            </div>
            <div className="flex items-center space-x-3">
              <ClipboardList className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                {consulta.medicoResponsavel}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              {statusIcons[consulta.status] || (
                <XCircle className="w-5 h-5 text-gray-600 mr-2" />
              )}
              <span className="text-gray-600">{consulta.status}</span>
            </div>
          </div>
        </div>
      </div>

      <AtualizarConsultaModal
        consulta={consulta}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={onUpdate}
      />

      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-800" />
              </div>
              <h2 className="text-xl font-bold text-teal-800">
                Confirmar Exclusão
              </h2>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                Tem certeza que deseja excluir essa consulta?{" "}
              </p>
              <p className="text-gray-600 text-sm">
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-5 py-2 text-gray-600 border rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardConsultas;
