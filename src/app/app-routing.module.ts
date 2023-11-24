import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AtividadesComponent } from './views/atividades/atividades.component';

const routes: Routes = [  
  // { 
  //   path: '', 
  //   redirectTo: 'conta/autenticar', 
  //   pathMatch: 'full' 
  // },
  // { 
  //   path: 'conta/autenticar', 
  //   component: LoginComponent, 
  //   canActivate: [LoginGuard] 
  // },
  // { 
  //   path: 'conta/registrar', 
  //   component: RegistroComponent, 
  //   canActivate: [LoginGuard] 
  // },
  // { 
  //   path: 'dashboard', 
  //   component: DashboardComponent, 
  //   canActivate: [authGuard] 
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'atividades',
    component: AtividadesComponent,
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./views/medicos/medico.module').then((m) => m.MedicoModule),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./views/consultas/consulta.module').then((m) => m.ConsultaModule),
  },
  {
    path: 'cirurgias',
    loadChildren: () =>
      import('./views/cirurgias/cirurgia.module').then((m) => m.CirurgiaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
