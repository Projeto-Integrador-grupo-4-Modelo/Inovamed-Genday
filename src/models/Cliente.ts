import Consulta from "./Consulta";

export default interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  convenio: boolean;
  consulta: Consulta | null;
}
