import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent as ListarMedicoComponent } from './listar-medicos/listar-medicos.component';
import { InserirMedicoComponent as InserirMedicoComponent } from './inserir-medico/inserir-medico.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarMedicoComponent,
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoRoutingModule {}
