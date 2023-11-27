import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ConsultaService } from './services/consulta.service';
import { FormsConsultaViewModel } from './models/forms-consulta.view-model';
import { VisualizarConsultaViewModel } from './models/visualizar-consulta.view-model';
import { ListarConsultasViewModel } from './models/listar-consulta.view-model';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';
import { VisualizarConsultaComponent } from './visualizar-consulta/visualizar-consulta.component';

const listarConsultasResolver: ResolveFn<ListarConsultasViewModel[]> = () => {
  return inject(ConsultaService).selecionarTodas();
};

const formsConsultaResolver: ResolveFn<FormsConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultaService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarConsultaResolver: ResolveFn<VisualizarConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultaService).selecionarConsultaCompletaPorId(
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
    component: ListarConsultasComponent,
    resolve: { consultas: listarConsultasResolver },
  },
  {
    path: 'inserir',
    component: InserirConsultaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarConsultaComponent,
    resolve: { consulta: formsConsultaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirConsultaComponent,
    resolve: { consulta: visualizarConsultaResolver },
  },
  {
    path: 'visualizar/:id',
    component: VisualizarConsultaComponent,
    resolve: { consulta: visualizarConsultaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaRoutingModule {}
