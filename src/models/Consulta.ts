import Medico from "./Medico";
import Paciente from "./Paciente";

export default interface Consulta {
  id: number;
  especialidade: string;
  queixa: string;
  dataHora: string;
  status: string;
  statusPagamento: string;
  paciente: Paciente | null;
  medico: Medico | null;
}
