import Consulta from "./Consulta";

export default interface Paciente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  convenio: boolean;
  consulta: Consulta | null;
}
