import React, { ChangeEvent, useState, useContext } from "react";
import { User, Stethoscope, FileText } from "lucide-react";
import Medico from "../../../models/Medico";
import { cadastrar } from "../../../service/Service";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

function FormMedico() {
  const navigate = useNavigate();
  const [medico, setMedico] = useState<Medico>({} as Medico);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setMedico({
      ...medico,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await cadastrar(`/medicos`, medico, setMedico, {
        headers: { Authorization: token },
      });

      toast.success("Médico cadastrado com sucesso!");
      setMedico({} as Medico);
      navigate("/dashboard/cadastro-medico");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        toast.error("Erro ao cadastrar médico.");
      }
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-[#29bda6] mb-8">
            Cadastro de Médico
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <User className="w-4 h-4 mr-2 text-[#29bda6]" />
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Digite o nome completo"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={medico.nome || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <Stethoscope className="w-4 h-4 mr-2 text-[#29bda6]" />
                Especialidade
              </label>
              <select
                name="especialidade"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={medico.especialidade || ""}
                onChange={atualizarEstado}
                required
              >
                <option value="">Selecione uma especialidade</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <FileText className="w-4 h-4 mr-2 text-[#29bda6]" />
                CRM
              </label>
              <input
                type="text"
                name="crm"
                placeholder="Digite o número do CRM"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={medico.crm || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#29bda6] text-white py-2 px-4 rounded-md hover:bg-[#278b7c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  </div>
                ) : (
                  "Cadastrar"
                )}
              </button>
              <button
                type="button"
                onClick={() => setMedico({} as Medico)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormMedico;
