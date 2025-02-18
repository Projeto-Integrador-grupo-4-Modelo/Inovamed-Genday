import Paciente from "./Paciente";

export default interface Consulta {
  id: number;
  especialidade: string;
  queixa: string;
  dataHora: string;
  medicoResponsavel: string;
  status: string;
  metodoPagamento: string;
  paciente: Paciente | null;
}
