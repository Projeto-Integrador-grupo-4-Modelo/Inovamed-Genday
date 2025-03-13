import {
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Heart,
  Building2,
  Building,
  Home,
} from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import Paciente from "../../../models/Paciente";

function FormPaciente() {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState<Paciente>({} as Paciente);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/pacientes/${id}`, setPaciente, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toast.error("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = e.target;

    setPaciente({
      ...paciente,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function retornar() {
    navigate("/dashboard/pacientes");
  }

  async function gerarNovoCliente(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/pacientes`, paciente, setPaciente, {
          headers: { Authorization: token },
        });
        toast.success("O Paciente foi atualizado com sucesso!");
      } else {
        await cadastrar(`/pacientes`, paciente, setPaciente, {
          headers: { Authorization: token },
        });
        toast.success("O Paciente foi cadastrado com sucesso!");
      }
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        toast.error("Erro ao processar a solicitação.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-[#29bda6] mb-8">
            Formulário de Cadastro
          </h2>

          <form onSubmit={gerarNovoCliente} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <User className="w-4 h-4 mr-2 text-[#29bda6]" />
                Nome
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={paciente.nome || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <Mail className="w-4 h-4 mr-2 text-[#29bda6]" />
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={paciente.email || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <Phone className="w-4 h-4 mr-2 text-[#29bda6]" />
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                placeholder="Digite seu telefone"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={paciente.telefone || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            {/* CPF */}
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <FileText className="w-4 h-4 mr-2 text-[#29bda6]" />
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                placeholder="Digite seu CPF"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={paciente.cpf || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            {/* Endereço e Complemento */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4 mr-2 text-[#29bda6]" />
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  placeholder="Digite seu endereço"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                  value={paciente.endereco || ""}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <Building className="w-4 h-4 mr-2 text-[#29bda6]" />
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  placeholder="Digite seu complemento"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                  value={paciente.complemento || ""}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            {/* CEP e Bairro */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4 mr-2 text-[#29bda6]" />
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  placeholder="Digite seu CEP"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                  value={paciente.cep || ""}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <Home className="w-4 h-4 mr-2 text-[#29bda6]" />
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  placeholder="Digite seu bairro"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                  value={paciente.bairro || ""}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            {/* Cidade */}
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <Building2 className="w-4 h-4 mr-2 text-[#29bda6]" />
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                placeholder="Digite sua cidade"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#29bda6] transition-colors"
                value={paciente.cidade || ""}
                onChange={atualizarEstado}
                required
              />
            </div>

            {/* Convênio */}
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-[#29bda6]" />
              <label className="text-sm font-medium">
                Possui Convênio?
                <input
                  type="checkbox"
                  name="convenio"
                  checked={paciente.convenio || false}
                  onChange={atualizarEstado}
                  className="ml-2 h-4 w-4 text-[#29bda6] focus:ring-[#29bda6] border-[#29bda6] rounded"
                />
              </label>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#29bda6] text-white py-2 px-4 rounded-md hover:bg-[#278b7c] transition-colors"
              >
                {isLoading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                )}
              </button>
              <button
                type="button"
                onClick={retornar}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default FormPaciente;
