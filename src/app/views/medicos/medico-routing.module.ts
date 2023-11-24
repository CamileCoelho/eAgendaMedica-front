import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { MedicoService } from './services/medico.service';
import { VisualizarMedicoViewModel } from './models/visualizar-medico.view-model';
import { FormsMedicoViewModel } from './models/forms-medico.view-model';
import { ListarMedicoViewModel } from './models/listar-medico.view-model';

const listarMedicosResolver: ResolveFn<ListarMedicoViewModel[]> = () => {
  return inject(MedicoService).selecionarTodos();
};

const formsMedicoResolver: ResolveFn<FormsMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicoService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicoService).selecionarMedicoCompletoPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarMedicosComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    resolve: { medico: formsMedicoResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirMedicoComponent,
    resolve: { medico: visualizarMedicoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoRoutingModule {}
