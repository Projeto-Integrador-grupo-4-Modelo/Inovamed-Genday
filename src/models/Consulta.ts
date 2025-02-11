import Cliente from "./Cliente";

export default interface Consulta {
  id: number;
  especialidade: string;
  queixa: string;
  data: string;
  medicoResponsavel: string;
  status: string;
  cliente: Cliente | null;
}
