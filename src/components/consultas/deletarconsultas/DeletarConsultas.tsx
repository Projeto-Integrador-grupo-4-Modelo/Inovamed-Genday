import { AlertTriangle, X } from "lucide-react";
import Consulta from "../../../models/Consulta";

interface ConfirmarDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  consulta: Consulta;
}

export function ConfirmarDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  consulta,
}: ConfirmarDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

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
            Tem certeza que deseja excluir a consulta?{" "}
            <span className="font-semibold">{consulta.especialidade}</span>?
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-700 hover:bg-yellow-800 rounded-md"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
