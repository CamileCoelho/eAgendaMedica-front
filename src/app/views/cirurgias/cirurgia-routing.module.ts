import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { CirurgiaService } from './services/cirurgia.service';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { ListarCirurgiasViewModel } from './models/listar-cirurgia.view-model';
import { FormsCirurgiaViewModel } from './models/forms-cirurgia.view-model';
import { VisualizarCirurgiaViewModel } from './models/visualizar-cirurgia.view-model';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';

const listarCirurgiasResolver: ResolveFn<ListarCirurgiasViewModel[]> = () => {
  return inject(CirurgiaService).selecionarTodas();
};

const formsCirurgiaResolver: ResolveFn<FormsCirurgiaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiaService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCirurgiaResolver: ResolveFn<VisualizarCirurgiaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiaService).selecionarCirurgiaCompletaPorId(
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
    component: ListarCirurgiasComponent,
    resolve: { cirurgias: listarCirurgiasResolver },
  },
  {
    path: 'inserir',
    component: InserirCirurgiaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarCirurgiaComponent,
    resolve: { cirurgia: formsCirurgiaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirCirurgiaComponent,
    resolve: { cirurgia: visualizarCirurgiaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CirurgiaRoutingModule {}
