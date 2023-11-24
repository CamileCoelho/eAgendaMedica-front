import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.view-model";

export type VisualizarCirurgiaViewModel = {
  id: string;   
  detalhes?: string;
  dataInicio: Date;
  dataTermino: Date;
  horaInicio: string;
  horaTermino: string;
  periodoRecuperacao: string;
  medicos: ListarMedicoViewModel [];
};
