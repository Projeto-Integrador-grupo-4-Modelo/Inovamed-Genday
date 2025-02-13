import Paciente from "./Paciente";

export default interface Consulta {
  id: number;
  especialidade: string;
  queixa: string;
  data: string;
  medicoResponsavel: string;
  status: string;
  paciente: Paciente | null;
}
